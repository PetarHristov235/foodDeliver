function loginUser() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const authenticationRequest = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authenticationRequest)
        })
        .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Login failed');
                }
        })
        .then(jwt => {
                console.log('Login successful! JWT:', jwt);
                alert('Login successful!');

                sessionStorage.setItem('jwt', jwt);

                setTimeout(function() {
                            window.location.assign("../Second Page/secondPage.html");
                }, 500);
        })
       .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Login failed!');
        });


}