document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'wangtao' && password === 'wang112233@') {
            window.location.href = "/wendang/web/61082520100415366X/web/"; // 替换为你的目标网址
        } else {
            alert('输入账号并不在本数据库内，请联系管理员！');
        }
    });
});
