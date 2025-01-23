import os
import json

# Specify the directory where your images are stored
image_directory = "assets/"
output_file = os.path.join(image_directory, "images.json")

# Supported image extensions
image_extensions = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg")

# Get all image files in the directory
images = [file for file in os.listdir(image_directory) if file.lower().endswith(image_extensions)]

# Write the image list to a JSON file
with open(output_file, "w") as f:
    json.dump(images, f, indent=4)

print(f"images.json file generated with {len(images)} images!")
