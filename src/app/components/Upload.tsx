"use client";

import { useState } from "react";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      console.log("Image selected:", selectedImage);
      // TODO: Handle API call here in the future.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Upload a picture of your car to get started
      </h1>

      {/* Upload Area */}
      <div className="relative bg-gray-100 w-[30rem] h-[20rem] rounded-lg border-dashed border-2 border-gray-400 flex items-center justify-center hover:bg-gray-200 transition">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        {!selectedImage ? (
          <p className="text-gray-600 text-center">
            Drag & Drop or <span className="text-blue-600 underline">Click to Upload</span>
          </p>
        ) : (
          <div className="absolute inset-0 flex  items-center justify-center bg-gray-50 bg-opacity-80  ">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {selectedImage && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={clearImage}
            className="text-lg bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            className="text-lg bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
