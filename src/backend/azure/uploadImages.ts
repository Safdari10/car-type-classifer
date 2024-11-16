import { CustomVisionTrainingClient } from "@azure/cognitiveservices-customvision-training";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import fs from "fs";
import path from "path";

// Getu Azure Custom Vision credentials from .env file
const trainingKey = process.env.CUSTOM_VISION_TRAINING_KEY;
const endpoint = process.env.CUSTOM_VISION_ENDPOINT;

if (!trainingKey || !endpoint) {
  throw new Error(
    "Please set your Custom Vision API key and end point in your .env file"
  );
}

//Initialise the Custom Vision training Client
const credentials = new ApiKeyCredentials({
  inHeader: { "Training-key": trainingKey },
});
const client = new CustomVisionTrainingClient(credentials, endpoint);

// Function to upload an image to the Azure Custom Vision
export default  async function uploadImage(
  imagePath: string,
  projectId: string,
  tag: string
) {
  try {
    const stream = fs.createReadStream(imagePath);
    const imageName = path.basename(imagePath);

    //upload the iamge to the project
    const image = await client.createImageFromData(projectId, stream, {
      tagIds: [tag],
    });
    console.log(`Uploaded ${imageName} to Custom Vision with tag: ${tag}`);
    return image;
  } catch (error) {
    console.error("Errror uploading image:", error);
    throw error;
  }
};
