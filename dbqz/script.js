document.addEventListener("DOMContentLoaded", async () => {
    const video = document.getElementById('video');
    const snapButton = document.getElementById('snap');
    const resultDiv = document.getElementById('result');

    // 获取摄像头流
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("无法获取摄像头:", err);
    }

    // 拍照按钮事件监听器
    snapButton.addEventListener('click', async () => {
        // 捕捉画面
        const canvas = await html2canvas(video);
        const dataURL = canvas.toDataURL('image/jpeg');

        // 上传至sm.ms
        const response = await uploadToSmMs(dataURL);
        if (response.success) {
            resultDiv.innerHTML = `上传成功! 图片链接: <a href="${response.data.url}" target="_blank">${response.data.url}</a>`;
        } else {
            resultDiv.innerHTML = `上传失败: ${response.message}`;
        }
    });

    // 上传至sm.ms函数
    async function uploadToSmMs(dataURL) {
        const response = await fetch('https://sm.ms/api/v2/upload', {
            method: 'POST',
            headers: {
                'Authorization': '14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf',
                'Content-Type': 'application/octet-stream'
            },
            body: dataURL.replace(/^data:image\/\w+;base64,/, "")
        });
        return await response.json();
    }
});
