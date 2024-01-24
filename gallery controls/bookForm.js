
const apiUrl = 'http://api.softsubversion.com/v1/booking/';

// Assuming you have a form element with the id 'myForm'
const formElement = document.getElementById('bookingForm');

formElement.addEventListener('submit', function (event) {
    event.preventDefault();
	const name = document.getElementById('id_name').value
	const email = document.getElementById('id_email').value
	const subject = document.getElementById('id_subject').value
	const body_text = document.getElementById('id_body').value
    const inputData = {
		'name': name, 
		'email': email, 
		'subject': subject, 
		'body_text': body_text
	}
	const formData = JSON.stringify({'data':inputData})
    // Make a POST request to the backend
    fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
			'Content-Type': 'application/json'
        },
    })
	.then(response => {
		//response check
		// if it's showing with an error, the system will toss and erro, if it's 
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: please refresh and try again`);
		}
		
		return response.json();
	  })
	  .then((data) => {

		
	
		window.location.replace('/book/success.html');
	  })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
});