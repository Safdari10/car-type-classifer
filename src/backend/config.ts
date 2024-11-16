import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training";

// Azure credentials from environment variables

export const trainingKey = process.env.CUSTOM_VISION_TRAINING_KEY
export const endpoint = process.env.CUSTOM_VISION_ENDPOINT
export const projectId = process.env.CUSTOM_VISION_PROJECT_ID;

if (!trainingKey || !endpoint || !projectId) {
    throw new Error(`Couldnt find training key, or endpoint, or projectId'`)
}

// Create Azure custom Vision client
const credentials = new ApiKeyCredentials({inHeader: {"TrainingKey": trainingKey}})
export const trainer = new TrainingAPIClient(credentials, endpoint)
