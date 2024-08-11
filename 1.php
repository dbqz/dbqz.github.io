<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>你好界面</title>
    <style>
        body {
            background-color: #f4f4f9; /* 设置背景颜色 */
            font-family: 'Arial', sans-serif; /* 设置字体 */
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
            height: 100vh; /* 使body高度占满整个视口高度 */
            margin: 0; /* 移除默认边距 */
        }
        .greeting {
            font-size: 2em; /* 设置字体大小 */
            color: #333; /* 设置字体颜色 */
            border: 1px solid #ddd; /* 添加边框 */
            padding: 20px; /* 添加内边距 */
            border-radius: 10px; /* 设置边框圆角 */
            box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 添加阴影效果 */
        }
    </style>
</head>
<body>
    <div class="greeting">
        <?php
            $greeting = "你好，欢迎来到我的网站！";
            echo htmlspecialchars($greeting, ENT_QUOTES, 'UTF-8'); // 防止XSS攻击
        ?>
    </div>
</body>
</html>
