# Dogevet backend

![image](https://user-images.githubusercontent.com/51771490/166848774-aafde27b-ff86-4e95-bbcb-ba5c65892d7b.png)

Dogevet is a web application for managing pet consultations. It supports authentication, authorization, consultations management, file uploads and more.

The frontend was made with React + Vite, TypeScript, Styled Components and uses Firebase for storing images in the cloud.
It consumes a REST API that you can find [here](https://github.com/LeuGimrt/dogevet-backend).

## Prerequisites
- NodeJS >= 16.0.0 installed
- Firebase project with storage service

## Running locally

### Setting up the environment

Create a .env file:
```
VITE_API_BASE_URL=<rest api url>
VITE_FIREBASE_API_KEY=<firebase api key>
VITE_FIREBASE_AUTH_DOMAIN=<firebase auth domain>
VITE_FIREBASE_PROJECT_ID=<firebase project id>
VITE_FIREBASE_STORAGE_BUCKET=<firebase storage bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<firebase messaging sender id>
VITE_FIREBASE_APP_ID=<firebase app id>
```

### Install all the packages

```
npm install
```
or (if you're using yarn):
```
yarn
```

### Start the app

```
npm run dev
```
or (if you're using yarn):
```
yarn dev
```

It should start running on localhost:3000 🤓
