    var form = document.getElementById("contact-form");


    // This function handles the form submission
    async function handleSubmit(event) {
        // Stop the form from reloading the page
        event.preventDefault();
        var data = new FormData(event.target);
        
        // Send the form data to Formspree
        fetch("https://formspree.io/f/mkgzpvne", {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            // If the submission was successful...
            if (response.ok) {
                // Show a success message and clear the form
                status.innerHTML = "Thanks for your submission!";
                form.reset();
            } else {
                // If there was an error...
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form"
                    }
                })
            }
        }).catch(error => {
            // Catch network errors
            status.innerHTML = "Oops! There was a problem submitting your form"
        });
    }

    // Add the submit event listener to the form
    form.addEventListener("submit", handleSubmit)
