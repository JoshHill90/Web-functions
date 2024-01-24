const gal = document.getElementById('gal').value;
const subgal = document.getElementById('subgal').value;
const galBox = document.getElementById('imageBox');
const nodal = document.getElementsByClassName('modal-content');
const heroDiv = document.getElementById('heroImage');
const modalGal = document.getElementById('modalContent')
const slides = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	return array;
}
	
function openModal() {
	document.getElementById("modal_displayer").style.display = "block";
}

function closeModal() {
	document.getElementById("modal_displayer").style.display = "none";
}

var slideIndex = 1;


function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	//console.log(n)
	showSlides(slideIndex = n);
}

async function imageSorter(headerImage, dataList) {
	const imageList =  shuffleArray(dataList);
    heroDiv.style.backgroundImage = `url('${headerImage}')`;
    ////console.log('check');

    let divCount = 0;
    let galRowCount = 1;
    let galRow;

    for (count = 0; count < imageList.length; ++count) {
		//console.log(imageList[count])
		// set img link per loop
		const img = imageList[count]
		const imgId = count
		// row controler swaps at 5 and 0, for the two sets of row formations
        if (divCount === 0 || divCount === 5) {
            //console.log('check2');
            galRow = document.createElement('div');
            galRow.classList = 'parent';
            galRow.id = `gal${galRowCount}`;
            galBox.appendChild(galRow);
            galRowCount += 1;
        }

		// set up for colums with image as background
        const colDiv = document.createElement('div');
        colDiv.classList = `div${divCount + 1}`;
        colDiv.classList.add('shadow-1-strong', 'rounded', 'slide-up');
		colDiv.style.backgroundImage = `url('${img}')`;
        colDiv.setAttribute('data-mdb-img', img);
        colDiv.onclick = function () {
            openModal();
            currentSlide(imgId + 1);
        };
		// ads adnimation from Float in 
		appearOnScroll.observe(colDiv);

        galRow.appendChild(colDiv);

		// set up fro modal image display
		const galSlide = document.createElement('div');
		galSlide.classList = ('gal-slide', 'text-center');
		modalGal.appendChild(galSlide)

		const slideText = document.createElement('div');
		slideText.classList = ('numbertext', 'p-p');
		galSlide.appendChild(slideText);

		const slideImg = document.createElement('img');
		slideImg.classList = ('text-center', 'slide-image','img-fluid');
		slideImg.src = img;
		slideImg.alt = 'Gallery Image';

		galSlide.appendChild(slideImg);
		slides.push(galSlide)
		//console.log(colDiv)
		// div counter 
        divCount += 1;
        if (divCount === 10) {
            divCount = 0;
        }
    }
    return;
}


// Featch call for images set by the onswer
window.addEventListener('load', () => {
	const galSet = {'gal': gal, 'subgal':subgal}
	
	fetch('http://api.softsubversion.com/v1/site-gallery/', {
		method: 'POST',
		body: JSON.stringify(galSet),
		headers: {
		  'Content-Type': 'application/json'
		}
	})
  .then(response => {
    //response check
	// if it's showing with an error, the system will toss and erro, if it's 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  })
  .then((data) => {
	const imageData = JSON.parse(data);
	const headerImage = imageData.header_image;
	const dataList = imageData.image_list;
	

	imageSorter(headerImage, dataList);
  })
  .then ((d) => {
	showSlides(slideIndex);
	
  })

  .catch(error => {
    console.error('Fetch error:', error);
  });
	
});

async function getMeta(url){
	let img = new Image();

	img.onerror = (err) => cb(err);
	img.src = url;

	return img
};

function showSlides(n) {
	var i;
	
	//console.log(slides.length)
	var dots = document.getElementsByClassName("numbered_img");

	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
}

	
