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
                img.addEventListener("click", () => openLightbox(img.src)); // Add click event for lightbox

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
    function openLightbox(src) {
        lightboxImage.src = src;
        lightbox.style.display = "flex";
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        lightboxImage.src = ""; // Clear the source for safety
    }

    lightboxClose.addEventListener("click", closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});
