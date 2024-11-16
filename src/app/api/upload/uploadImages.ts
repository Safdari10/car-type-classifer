import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import fs from "fs";
import path from "path";

// Get Azure Custom Vision credentials from .env file
const trainingKey = process.env.CUSTOM_VISION_TRAINING_KEY;
const endpoint = process.env.CUSTOM_VISION_ENDPOINT;
const projectId = process.env.CUSTOM_VISION_PROJECT_ID

if (!trainingKey || !endpoint || !projectId) {
  throw new Error("Please set your Custom Vision API key and endpoint in your .env file");
}

// Initialize the Custom Vision Training Client
const credentials = new ApiKeyCredentials({ inHeader: { "Training-key": trainingKey } });
const trainer = new TrainingAPIClient(credentials, endpoint);

// Function to upload an image to the Azure Custom Vision
export default async function uploadImage(
  imagePath: string,
  projectId: string,
  tag: string
) {
  try {
    const imageName = path.basename(imagePath);
    const imageData = fs.readFileSync(imagePath);  // Synchronously read image data

    // Upload the image to the project with a tag
    const image = await trainer.createImagesFromData(projectId, imageData, {
      tagIds: [tag],
    });

    console.log(`Uploaded ${imageName} to Custom Vision with tag: ${tag}`);
    return image;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
