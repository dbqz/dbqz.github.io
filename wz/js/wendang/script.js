document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'wangtao' && password === 'wangtao') {
            window.location.href = "/wendang/"; // 替换为你的目标网址
        } else {
            alert('Invalid credentials.');
        }
    });
});