import { CustomVisionTrainingClient } from "@azure/cognitiveservices-customvision-training";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import fs from "fs"
import path from "path";

// Getu Azure Custom Vision credentials from .env file
const trainingKey = process.env.CUSTOM_VISION_TRAINING_KEY;
const endpoint = process.env.CUSTOM_VISION_ENDPOINT;

if(!trainingKey || endpoint) {
    throw new Error("Please set your Custom Vision API key and end point in your .env file")
}