document.getElementById('promptForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const promptInput = document.getElementById('promptInput');
    const generatedImage = document.getElementById('generatedImage');

    // Fetch the image from your API endpoint
    const response = await fetch(`https://ai.api.dbqz.xyz/generate?prompt=${encodeURIComponent(promptInput.value)}`);
    
    if (!response.ok) {
        alert('Failed to generate image.');
        return;
    }

    // Since the backend returns an image directly, we can use it as is
    generatedImage.src = URL.createObjectURL(await response.blob());
    generatedImage.style.display = 'block';
});
