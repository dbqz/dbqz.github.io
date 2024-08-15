// script.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://sql.api.dbqz.xyz/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
        window.location.href = '/wendang/web/61082520100415366X/web';
    } else {
        alert('Login failed: ' + result.message);
    }
});
