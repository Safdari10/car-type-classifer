import { customVisionEndpoint, projectId, trainingKey } from "./config";

const TRAINING_API_VERSION = "v3.3";

export type CustomVisionTag = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  imageCount?: number;
};

type CustomVisionError = {
  code?: string;
  message?: string;
};

type ImageCreateSummary = {
  isBatchSuccessful?: boolean;
  images?: Array<{
    status?: string;
    image?: {
      id?: string;
    };
    sourceUrl?: string;
  }>;
};

const buildTrainingUrl = (path: string, params?: Record<string, string | string[]>) => {
  const url = new URL(
    `${customVisionEndpoint}/customvision/${TRAINING_API_VERSION}/training/projects/${projectId}${path}`
  );

  for (const [key, value] of Object.entries(params ?? {})) {
    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(key, item);
      }
    } else {
      url.searchParams.set(key, value);
    }
  }

  return url;
};

const requestCustomVision = async <T>(url: URL, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Training-Key": trainingKey,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as CustomVisionError | null;
    throw new Error(
      body?.message ??
        `Custom Vision request failed with ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
};

export const createTag = (name: string) => {
  const url = buildTrainingUrl("/tags", { name });
  return requestCustomVision<CustomVisionTag>(url, { method: "POST" });
};

export const listTags = () => {
  const url = buildTrainingUrl("/tags");
  return requestCustomVision<CustomVisionTag[]>(url);
};

export const uploadImageData = (imageData: Buffer, tagIds: string[]) => {
  const url = buildTrainingUrl("/images", { tagIds });
  const body = imageData.buffer.slice(
    imageData.byteOffset,
    imageData.byteOffset + imageData.byteLength
  ) as ArrayBuffer;

  return requestCustomVision<ImageCreateSummary>(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
};
