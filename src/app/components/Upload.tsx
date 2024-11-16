"use client";

import { useState } from "react";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      console.log("Image selected:", selectedImage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">
        Please upload a picture of your car to get started:
      </h1>
      <input
        type="file"
        accept="image/"
        onChange={handleImageChange}
        className="border p-2"
      />
      {selectedImage && (
        <div>
          <p>Selected file: {selectedImage.name}</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="preview"
            className="max-w-xs mt-2"
          />
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded">
        Upload Image
      </button>
    </div>
  );
};

export default Upload;
