# Car Type Classifier

Car Type Classifier is a Next.js web application that classifies a user-uploaded vehicle photo using an already trained and published Azure Custom Vision model.

The app also includes optional backend utility scripts for adding tags and uploading local training images into an existing Azure Custom Vision project dataset. Those scripts do not train or publish a model.

## Features

- Upload a vehicle photo and get predictions from a published Custom Vision classifier
- See safe upload or prediction errors directly in the upload panel
- Modern, responsive UI
- Optional scripts for creating tags and uploading local images to a Custom Vision training dataset

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun
- A published Azure Custom Vision classification iteration for app predictions
- Optional: Azure Custom Vision training credentials if you want to use the dataset upload scripts

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Safdari10/car-type-classifier.git
cd car-type-classifier
npm install
# or
yarn install
# or
pnpm install
```

Create a `.env.local` file from `.env.example` and add your prediction settings:

```bash
CUSTOM_VISION_PREDICTION_ENDPOINT=
CUSTOM_VISION_PREDICTION_KEY=
CUSTOM_VISION_PROJECT_ID=
CUSTOM_VISION_PUBLISHED_NAME=
```

`CUSTOM_VISION_PUBLISHED_NAME` is the name used when publishing an iteration in Azure Custom Vision. The web app cannot classify images until the Azure model has been trained and published.

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. On the homepage, click the upload area to select a car photo, or drag and drop an image.
2. Click upload to classify the image with the published Azure Custom Vision model.
3. If prediction settings are missing or invalid, the app shows a safe user-facing error in the upload panel and logs technical details on the server.

## Azure Custom Vision Setup

### Prediction Variables

These variables are required for the web app upload button:

```bash
CUSTOM_VISION_PREDICTION_ENDPOINT=
CUSTOM_VISION_PREDICTION_KEY=
CUSTOM_VISION_PROJECT_ID=
CUSTOM_VISION_PUBLISHED_NAME=
```

Use these when you already have a trained and published Custom Vision classifier.

### Dataset Upload Variables

These variables are required only for the optional backend scripts:

```bash
CUSTOM_VISION_TRAINING_KEY=
CUSTOM_VISION_TRAINING_ENDPOINT=
CUSTOM_VISION_PROJECT_ID=
```

Use these when you want to add tags or upload training images into an existing Custom Vision project dataset.

## Backend Utilities

The backend scripts work with an existing Azure Custom Vision project. They do not create a project, train an iteration, or publish a model.

### Create Tags

```bash
npm run tag
```

This runs `src/backend/createTags.ts` and creates the configured vehicle tags in the existing Custom Vision project.

### Upload Training Images

```bash
npm run upload
```

This runs `src/backend/uploadImage.ts`. It expects local training image folders under `src/images/`, for example:

```txt
src/images/Convertible
src/images/Coupe
src/images/Hatchback
src/images/Minivan
src/images/Pickup
src/images/Sedan
src/images/SUV
src/images/Station Wagon
src/images/Truck
src/images/Van
```

The upload script reads the existing Azure tags, maps folder/tag names to real Azure tag IDs, and uploads each image into the project dataset with the matching tag.

After uploading new dataset images, train and publish a new iteration in Azure Custom Vision if you want the web app to use the updated model.

## Project Structure

- `src/app/` – Frontend UI components and pages
- `src/app/api/classify/` – Prediction API route used by the upload UI
- `src/backend/` – Optional scripts for creating tags and uploading training images
- `public/` – Static assets

## License

MIT
