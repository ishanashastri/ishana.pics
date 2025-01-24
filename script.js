document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    if (!gallery){console.log('failed!');}
    const imageFolder = "assets/"; // Folder where images are stored

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");

    // Fetch the image list from JSON
    fetch("assets/images.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load image list");
            }
            return response.json();
        })
        .then((imageList) => {
            // Add images dynamically to the gallery
            let loadedImages = 0;
            imageList.forEach((imageName) => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");

                const img = document.createElement("img");
                img.src = `${imageFolder}${imageName}`;
                img.alt = imageName;
                img.addEventListener("click", () => openLightbox(img)); // Add click event for lightbox

                img.onload = () => {
                    loadedImages++;
                    if (loadedImages === imageList.length) {
                        // Initialize Masonry after all images are loaded
                        new Masonry(gallery, {
                            itemSelector: ".grid-item",
                            columnWidth: ".grid-item",
                            percentPosition: true,
                        });
                    }
                };

                gridItem.appendChild(img);

                gallery.appendChild(gridItem);
            });
        })
        .catch((error) => {
            console.error("Error loading image list:", error);
        });
  
    // Lightbox functionality
    function openLightbox(img) {
        const rect = img.getBoundingClientRect(); // Get the position and size of the clicked image

        // Set the lightbox image to match the original image's position and size
        lightboxImage.src = img.src;
        lightboxImage.style.top = `${rect.top}px`;
        lightboxImage.style.left = `${rect.left}px`;
        lightboxImage.style.width = `${rect.width}px`;
        lightboxImage.style.height = `${rect.height}px`;

        // Display the lightbox container
        lightbox.style.display = "block";

        // Trigger the zoom-in animation by setting it to full-screen size
        setTimeout(() => {
            lightboxImage.style.top = "50%";
            lightboxImage.style.left = "50%";
            lightboxImage.style.transform = "translate(-50%, -50%) scale(1)";
            lightboxImage.style.width = "";
            lightboxImage.style.height = "";
        }, 10);
    }

    function closeLightbox() {
        // Reverse the zoom-out animation to the image's original position
        const rect = lightboxImage.getBoundingClientRect();
        lightboxImage.style.top = `${rect.top}px`;
        lightboxImage.style.left = `${rect.left}px`;
        lightboxImage.style.width = `${rect.width}px`;
        lightboxImage.style.height = `${rect.height}px`;
        lightboxImage.style.transform = "";

        // Hide the lightbox after the animation
        setTimeout(() => {
            lightbox.style.display = "none";
            lightboxImage.src = ""; // Clear the source for safety
        }, 10); // Match the transition duration
    }

    lightboxClose.addEventListener("click", closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});
