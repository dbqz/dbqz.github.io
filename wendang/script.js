// script.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
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
            showMessage('Login failed: ' + (result.message || 'Invalid credentials'));
        }
    } catch (error) {
        showMessage('An error occurred: ' + error.message);
    }
});

function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}
