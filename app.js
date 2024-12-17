// app.js

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

// Capture Photo
document.getElementById('capture').addEventListener('click', async () => {
    const video = document.createElement('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.addEventListener('loadeddata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const imgData = canvas.toDataURL('image/png');
        document.getElementById('output').innerHTML = `<img src="${imgData}" alt="Captured Image"/>`;
        
        // Stop the video stream
        stream.getTracks().forEach(track => track.stop());
    });
});

// Get Geolocation
document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locationInfo = `Latitude: ${lat}, Longitude: ${lon}`;
            document.getElementById('output').innerHTML += `<p>${locationInfo}</p>`;

            // Store location in localStorage
            localStorage.setItem('location', locationInfo);
        }, (error) => {
            console.error('Error getting location:', error);
        });
    } else {
        console.warn('Geolocation is not supported by this browser.');
    }
});
