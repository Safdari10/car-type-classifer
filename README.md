# Turner Insurance App

This project is a car insurance web application built with [Next.js](https://nextjs.org/) and TypeScript. It allows users to upload images of their cars, which are then processed using Azure Custom Vision to classify car types and assist with insurance processes.

## Features

- Modern UI for uploading car images
- Integration with Azure Custom Vision for car type classification
- Backend scripts for training models, creating tags, and uploading images
- Tailwind CSS for styling

## Project Structure

- `src/app/` – Next.js frontend (UI, pages, components)
- `src/backend/` – Node.js backend scripts for Azure Custom Vision
- `public/` – Static assets

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root with the following variables:

```
CUSTOM_VISION_TRAINING_KEY=your_training_key
CUSTOM_VISION_ENDPOINT=your_endpoint_url
CUSTOM_VISION_PROJECT_ID=your_project_id
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Backend Scripts

The backend scripts in `src/backend/` are used for managing Azure Custom Vision:

- `createTags.ts` – Creates tags for car types in your Custom Vision project.
- `uploadImage.ts` – Uploads images from local folders to Azure Custom Vision, associating them with tags.
- `trainmodel.ts` – (To be implemented) Script for training the model.

Run backend scripts with:

```bash
npm run tag      # Runs createTags.ts
npm run upload   # Runs uploadImage.ts
```

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Azure Custom Vision SDK

## Folder Structure

- `src/app/components/Upload.tsx` – Main upload component for car images
- `src/backend/` – Azure Custom Vision integration scripts
- `src/app/styles/global.css` – Global styles using Tailwind CSS

## License

This project is for educational and demonstration purposes.
