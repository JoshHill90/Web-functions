// Featch call for images set by the onswer
const imageLoading = document.getElementsByClassName('loader')
//console.log(imageLoading.length)
window.addEventListener('load', () => {
  
	fetch('http://api.softsubversion.com/v1/gallery-hall/', {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		}
	})
	//check responce 
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })

  .then(data => {
	for(var index=0;index < imageLoading.length;index++){
		imageLoading[index].style.display = 'none'
	}
    // Create the div element
    const imageGal1 = document.getElementById('image1');
    const imageGal2 = document.getElementById('image2');
    const imageGal3 = document.getElementById('image3');
    // Add classes and styles to the div
	imageGal1.classList.remove('display-off');
	imageGal2.classList.remove('display-off');
	imageGal3.classList.remove('display-off');

    imageGal1.src = data.image1Set[0].image_link;
    imageGal2.src = data.image1Set[1].image_link;
    imageGal3.src = data.image1Set[2].image_link;
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
	
});
