const innerObj = document.getElementById('innerBox');



async function executeImageMoves() {
  imageObj = document.querySelectorAll('.image-objects');
  
  for (i = 0; i < imageObj.length; ++i) {
    imageObj[i].style.transform.transition = 'transform 10000';
    imageObj[i].style.transform = 'translate(100vw) scale(108%, 108%)'
    imageObj[i].style.opacity = 1;
    //console.log(imageObj[i].clientWidth)
    await new Promise((resolve) => {

      setTimeout(() => {


        imageObj[i].style.transform = 'translate(-100vw)'

        //console.log('re-run')
        resolve();
      }, 5000); 
      
    });
    if (i === (imageObj.length - 1)) {
      i = 0;
      //imageObj[-1].classList.add('display-off')
    } 
    //tempRight.classList.remove('display-off')
  }
  return;
}


// Featch call for images set by the onswer
window.addEventListener('load', () => {
	fetch('http://api.softsubversion.com/v1/index/', {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		}
	})
  .then(response => {
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  })
  .then(data => {
    //console.log(data.herSet.length)
    for (let i = 0; i < data.herSet.length; i++) {
      // Create the div element
      const imageObjectDiv = document.createElement('div');
      
      // Add classes and styles to the div
      imageObjectDiv.className = 'image-objects';
      imageObjectDiv.style.opacity = 0;
      imageObjectDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${data.herSet[i].image_link}')`;
    
      // Add classes and styles to the array
      imageObjectDiv.style.transform.transition = 'transform 10000';
      imageObjectDiv.style.transform = 'translate(-100vw)'
      // Append the div to the container
      innerObj.appendChild(imageObjectDiv);
      
      
      //console.log('ste1')
    }
    setTimeout(() => {
      executeImageMoves();
    }, 800);
    
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
	
});



