import fs from "fs";
import path from "path";
import { listTags, uploadImageData } from "./customVision";

/**
 * Uploads all images from the specified directory to Azure Custom Vision with multiple tag IDs.
 * @param dirPath Path to the directory containing images.
 * @param tagIds Array of tag IDs to associate with the uploaded images.
 */

async function uploadImagesWithTags(dirPath: string, tagIds: string[]) {
  const imageFiles = fs.readdirSync(dirPath); // Get all files in the directory

  const uploadPromises = imageFiles.map((file) => {
    const filePath = path.join(dirPath, file);
    const imageData = fs.readFileSync(filePath); // Read image as buffer

    console.log(`Uploading image: ${filePath} with tags: ${tagIds}`);
    return uploadImageData(imageData, tagIds);
  });

  // Wait for all uploads to complete
  await Promise.all(uploadPromises);
  console.log(
    `Uploaded all images from directory: ${dirPath} with tags: ${tagIds}`
  );
}

// Main function to upload images from multiple directories with their respective tags.

export async function uploadBatchImagesWithMultipleTags() {
  try {
    const baseDir = "src/images";
    const tags = await listTags();
    const tagIdByName = new Map(tags.map((tag) => [tag.name, tag.id]));

    const directoriesAndTags = [
      { dir: `${baseDir}/Convertible`, tagNames: ["Convertible"] },
      { dir: `${baseDir}/Coupe`, tagNames: ["Coupe"] },
      { dir: `${baseDir}/Hatchback`, tagNames: ["Hatchback"] },
      { dir: `${baseDir}/Minivan`, tagNames: ["Minivan"] },
      { dir: `${baseDir}/Pickup`, tagNames: ["Pickup"] },
      { dir: `${baseDir}/Sedan`, tagNames: ["Sedan"] },
      { dir: `${baseDir}/SUV`, tagNames: ["SUV"] },
      { dir: `${baseDir}/Station Wagon`, tagNames: ["Station Wagon"] },
      { dir: `${baseDir}/Truck`, tagNames: ["Truck"] },
      { dir: `${baseDir}/Van`, tagNames: ["Van"] },
    ];

    for (const { dir, tagNames } of directoriesAndTags) {
      const tagIds = tagNames.map((tagName) => {
        const tagId = tagIdByName.get(tagName);

        if (!tagId) {
          throw new Error(`Custom Vision tag not found: ${tagName}`);
        }

        return tagId;
      });

      await uploadImagesWithTags(dir, tagIds);
    }
    console.log("All directories processed successfully");
  } catch (error) {
    console.error("Error uploading images:", error);
  }
}
