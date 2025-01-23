const gallery = document.getElementById('gallery');

// Fetch the JSON file and populate the gallery
fetch('assets/images.json')
    .then(response => response.json())
    .then(images => {
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="assets/${image}" alt="Image ${index + 1}">
            `;
            gallery.appendChild(item);

            // Add click event for lightbox functionality
            const img = item.querySelector('img');
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt || '';
            });
        });
    })
    .catch(error => console.error('Error loading images:', error));

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
