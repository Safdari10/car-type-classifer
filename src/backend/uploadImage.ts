import fs from "fs";
import path from "path";
import { trainer, projectId } from "./config";

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
    return trainer.createImagesFromData(projectId!, imageData, { tagIds });
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

    const directoriesAndTags = [
      { dir: `${baseDir}/Convertible`, tagIds: ["Convertible"] },
      { dir: `${baseDir}/Coupe`, tagIds: ["Coupe"] },
      { dir: `${baseDir}/Hatchback`, tagIds: ["Hatchback"] },
      { dir: `${baseDir}/Minivan`, tagIds: ["Minivan"] },
      { dir: `${baseDir}/Pickup`, tagIds: ["Pickup"] },
      { dir: `${baseDir}/Sedan`, tagIds: ["Sedan"] },
      { dir: `${baseDir}/SUV`, tagIds: ["SUV"] },
      { dir: `${baseDir}/Station Wagon`, tagIds: ["Station Wagon"] },
      { dir: `${baseDir}/Truck`, tagIds: ["Truck"] },
      { dir: `${baseDir}/Van`, tagIds: ["Van"] },
    ];

    for (const { dir, tagIds } of directoriesAndTags) {
      await uploadImagesWithTags(dir, tagIds);
    }
    console.log("All directories processed successfully");
  } catch (error) {
    console.error("Error uploading images:", error);
  }
}
