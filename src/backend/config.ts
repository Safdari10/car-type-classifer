import { config } from "dotenv";

config({ path: ".env.local" });
config();

const trainingKeyEnv = process.env.CUSTOM_VISION_TRAINING_KEY;
const trainingEndpointEnv = process.env.CUSTOM_VISION_TRAINING_ENDPOINT;
const projectIdEnv = process.env.CUSTOM_VISION_PROJECT_ID;

if (!trainingKeyEnv || !trainingEndpointEnv || !projectIdEnv) {
  throw new Error(
    "Missing CUSTOM_VISION_TRAINING_KEY, CUSTOM_VISION_TRAINING_ENDPOINT, or CUSTOM_VISION_PROJECT_ID"
  );
}

export const trainingKey = trainingKeyEnv;
export const projectId = projectIdEnv;
export const customVisionEndpoint = trainingEndpointEnv.replace(/\/+$/, "");
