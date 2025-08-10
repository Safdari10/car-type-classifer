# Car Type Classifier

Car Type Classifier is a web application that uses machine learning to identify the type of car (e.g., sedan, SUV, convertible, etc.) from a user-uploaded photo. Built with Next.js and integrated with Azure Custom Vision.

## Features

- Upload a photo of a car and instantly get its predicted type
- Modern, responsive UI
- Powered by a custom-trained image classification model

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun
- (Optional) Azure Custom Vision credentials for backend training/upload

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

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. On the homepage, click the upload area to select a car photo, or drag and drop an image.
2. (Future) The app will display the predicted car type after upload.

### Backend (Optional)

If you want to retrain or upload new images to Azure Custom Vision:

- Set your Azure credentials in a `.env` file (see `src/backend/config.ts` for required variables)
- Use the provided scripts in `src/backend/` to create tags or upload images

## Project Structure

- `src/app/` – Frontend UI components and pages
- `src/backend/` – Scripts for training and uploading images to Azure
- `public/` – Static assets

## License

MIT
