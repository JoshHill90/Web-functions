const uploadButton = document.getElementById("uploadButton");
const loaderBar = document.getElementById('dotsLoader');
uploadButton.addEventListener("click", uploadFiles);
const imageCreatePage = document.getElementById('imageCreatePage').value;
const url = document.getElementById('url').value;


function uploadFiles(event) {
	event.preventDefault();
	const csrftoken = getCookie('csrftoken');
	const fileLimit = 100;
	const imageUpload = document.getElementById("imageUpload");
	const imageFiles = imageUpload.files;
	
    if (imageFiles.length === 0) {
        alert("Please select at least one image file of a valid format to upload.");
		return;
    } else if (imageFiles.length > fileLimit) {
        alert(`Please select up to ${fileLimit} files.`);
		return;
    } else {
		uploadButton.style.display = 'none'
		loaderBar.style.display = 'flex'
    }

	const data = {'file_count': imageFiles.length, 'cf_data': 'cf_data'}

	fetch(url, {
		method: 'POST', 
		body: JSON.stringify(data), 
		credentials: 'same-origin',

		headers: {
		'cf_data': 'cf_data',
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken
		}

		})
		.then(res => res.json())
		.then(responseData => {
			uploadImages(responseData, imageFiles, imageCreatePage)
			.then(({ backEndData, redirectUrl }) => {
				delayedRedirect(backEndData, redirectUrl);
			});
		}).catch(error => console.error('Error:', error));

};

async function uploadImages(responseData, imageFiles, pageURL) {
	let fileCounter = 0;
	const backEndData = []
	for (let cfData of responseData) {
		const cloudflareId = cfData.cf_id;
		const cloudflareURL = cfData.cf_url;


		const imgMultiPart = new FormData();

		imgMultiPart.append("file", imageFiles[fileCounter]);
		
		try {
		await fetch(cloudflareURL, {
			method: "post",
			body: imgMultiPart,
		});

		backEndData.push(cloudflareId)
		} catch (error) {
		console.error(error);
		alert(error);
		return false;
		}

		fileCounter++;
	}
	return { 'backEndData': backEndData, 'redirectUrl': pageURL }
}

function delayedRedirect(backEndData, redirectUrl) {
	const csrfGet = getCookie('csrftoken');
	data = {'data': backEndData}
	fetch(redirectUrl, {
		
		method: 'POST', 
		body: JSON.stringify(data), 
		credentials: 'same-origin',

		headers: {
		'cf_data': 'cf_data',
		'Content-Type': 'application/json',
		'X-CSRFToken': csrfGet
		}


	})
	.then(response => response.text())  // Convert response to text
	.then(response => {
		const newURL = response.slice(1, -1)
		window.location.href = newURL;
	})
	.catch(error => console.error('Error:', error));
}