document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'wangtao' && password === 'wangtao') {
            window.location.href = "/wendang/web/61082520100415366X/"; // 替换为你的目标网址
        } else {
            alert('账号或密码错误，老弟没实力就别登！');
        }
    });
});
