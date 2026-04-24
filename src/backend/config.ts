import "dotenv/config";

const trainingKeyEnv = process.env.CUSTOM_VISION_TRAINING_KEY;
const endpointEnv = process.env.CUSTOM_VISION_ENDPOINT;
const projectIdEnv = process.env.CUSTOM_VISION_PROJECT_ID;

if (!trainingKeyEnv || !endpointEnv || !projectIdEnv) {
  throw new Error(
    "Missing CUSTOM_VISION_TRAINING_KEY, CUSTOM_VISION_ENDPOINT, or CUSTOM_VISION_PROJECT_ID"
  );
}

export const trainingKey = trainingKeyEnv;
export const projectId = projectIdEnv;
export const customVisionEndpoint = endpointEnv.replace(/\/+$/, "");
