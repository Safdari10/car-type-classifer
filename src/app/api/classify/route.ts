import { NextResponse } from "next/server";

const PREDICTION_API_VERSION = "v3.1";
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

type CustomVisionPrediction = {
  tagId: string;
  tagName: string;
  probability: number;
};

type CustomVisionPredictionResponse = {
  id: string;
  project: string;
  iteration: string;
  created: string;
  predictions: CustomVisionPrediction[];
};

type CustomVisionError = {
  code?: string;
  message?: string;
};

const errorResponse = (message: string, status: number, code: string) => {
  return NextResponse.json({ error: { code, message } }, { status });
};

const getPredictionConfig = () => {
  const endpoint = process.env.CUSTOM_VISION_PREDICTION_ENDPOINT;
  const predictionKey = process.env.CUSTOM_VISION_PREDICTION_KEY;
  const projectId = process.env.CUSTOM_VISION_PROJECT_ID;
  const publishedName = process.env.CUSTOM_VISION_PUBLISHED_NAME;

  const missing: string[] = [];

  if (!endpoint) {
    missing.push("CUSTOM_VISION_PREDICTION_ENDPOINT");
  }

  if (!predictionKey) {
    missing.push("CUSTOM_VISION_PREDICTION_KEY");
  }

  if (!projectId) {
    missing.push("CUSTOM_VISION_PROJECT_ID");
  }

  if (!publishedName) {
    missing.push("CUSTOM_VISION_PUBLISHED_NAME");
  }

  if (!endpoint || !predictionKey || !projectId || !publishedName) {
    console.error(`Custom Vision prediction is not configured: ${missing.join(", ")}`);

    return {
      error: true,
    };
  }

  return {
    endpoint: endpoint.replace(/\/+$/, ""),
    predictionKey,
    projectId,
    publishedName,
  };
};

export const POST = async (request: Request) => {
  const config = getPredictionConfig();

  if ("error" in config) {
    return errorResponse(
      "Prediction is not configured yet. Please check the app setup.",
      503,
      "PREDICTION_NOT_CONFIGURED"
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return errorResponse("Choose an image before uploading.", 400, "IMAGE_REQUIRED");
  }

  if (!image.type.startsWith("image/")) {
    return errorResponse("Please upload a valid image file.", 400, "INVALID_IMAGE_TYPE");
  }

  if (image.size > MAX_IMAGE_SIZE) {
    return errorResponse("Please upload an image that is 4 MB or smaller.", 400, "IMAGE_TOO_LARGE");
  }

  const predictionUrl = new URL(
    `${config.endpoint}/customvision/${PREDICTION_API_VERSION}/prediction/${config.projectId}/classify/iterations/${config.publishedName}/image`
  );

  const response = await fetch(predictionUrl, {
    method: "POST",
    body: await image.arrayBuffer(),
    headers: {
      "Content-Type": "application/octet-stream",
      "Prediction-Key": config.predictionKey,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as CustomVisionError | null;
    console.error("Custom Vision prediction failed", {
      status: response.status,
      statusText: response.statusText,
      code: body?.code,
      message: body?.message,
    });

    return errorResponse(
      "The image could not be classified right now. Please try again later.",
      response.status >= 500 ? 502 : 400,
      "PREDICTION_FAILED"
    );
  }

  const result = (await response.json()) as CustomVisionPredictionResponse;
  const predictions = result.predictions
    .toSorted((a, b) => b.probability - a.probability)
    .slice(0, 5);

  return NextResponse.json({ predictions });
};
