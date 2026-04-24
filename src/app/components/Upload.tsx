"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

const formatFileSize = (bytes: number) => {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(megabytes >= 10 ? 0 : 1)} MB`;
};

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<
    Array<{ tagId: string; tagName: string; probability: number }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      setSelectedImage(image);
      setPreviewUrl(URL.createObjectURL(image));
      setError(null);
      setPredictions([]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    setPredictions([]);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      return;
    }

    setIsUploading(true);
    setError(null);
    setPredictions([]);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        error?: {
          code: string;
          message: string;
        };
        predictions?: Array<{ tagId: string; tagName: string; probability: number }>;
      };

      if (!response.ok) {
        throw new Error(result.error?.message ?? "Image classification failed.");
      }

      setPredictions(result.predictions ?? []);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Image classification failed."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] lg:grid-cols-[1.25fr_0.75fr]">
      <label className="group relative block min-h-88 cursor-pointer overflow-hidden bg-slate-950 sm:min-h-120">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="peer sr-only"
        />

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(17,24,39,0.74)),repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_64px)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-red-950/50 to-transparent" />

        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Selected vehicle preview"
            fill
            unoptimized
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="relative flex h-full min-h-88 flex-col items-center justify-center gap-5 px-6 text-center text-white sm:min-h-120">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner">
              <span className="block h-8 w-12 rounded-t-full border-2 border-white/80 border-b-0" />
            </div>
            <div>
              <p className="text-2xl font-semibold">
                Drop a vehicle image here
              </p>
              <p className="mt-2 text-sm text-slate-300">
                JPG, PNG, GIF, or BMP up to the Custom Vision image limit
              </p>
            </div>
            <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition group-hover:bg-red-600 group-hover:text-white group-focus-within:ring-2 group-focus-within:ring-red-500 group-focus-within:ring-offset-4">
              Choose image
            </span>
          </div>
        )}
      </label>

      <aside className="flex flex-col justify-between gap-8 border-t border-slate-200 bg-slate-50 p-5 sm:p-6 lg:border-l lg:border-t-0">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Current image
          </p>

          {selectedImage ? (
            <div className="mt-5 space-y-4">
              <div>
                <p className="wrap-break-word text-xl font-semibold text-slate-950">
                  {selectedImage.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedImage.type || "Image file"} -{" "}
                  {formatFileSize(selectedImage.size)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border border-slate-200 bg-white p-3">
                  <p className="font-semibold text-slate-950">Status</p>
                  <p className="mt-1 text-slate-500">
                    {isUploading ? "Classifying" : "Ready"}
                  </p>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-3">
                  <p className="font-semibold text-slate-950">Source</p>
                  <p className="mt-1 text-slate-500">Local upload</p>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3">
                  <p className="text-sm font-semibold text-red-900">Setup error</p>
                  <p className="mt-1 text-sm leading-6 text-red-800">{error}</p>
                </div>
              )}

              {predictions.length > 0 && (
                <div className="rounded-md border border-slate-200 bg-white p-3">
                  <p className="text-sm font-semibold text-slate-950">Top predictions</p>
                  <div className="mt-3 space-y-3">
                    {predictions.map((prediction) => (
                      <div key={prediction.tagId}>
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="font-medium text-slate-700">
                            {prediction.tagName}
                          </span>
                          <span className="text-slate-500">
                            {(prediction.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-red-700"
                            style={{ width: `${prediction.probability * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-md border border-dashed border-slate-300 bg-white p-4">
              <p className="text-base font-semibold text-slate-950">
                No image selected
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use a side, front, or rear vehicle photo with the full body in
                frame.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedImage || isUploading}
            className="min-h-11 flex-1 rounded-md bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {isUploading ? "Classifying..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={clearImage}
            disabled={!selectedImage}
            className="min-h-11 flex-1 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
          >
            Clear
          </button>
        </div>
      </aside>
    </section>
  );
};

export default Upload;
