# Firebase Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_MESSAGING_SENDERID=your_messaging_sender_id
NEXT_PUBLIC_API_ID=your_app_id
NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id
```

## How to Get These Values

1. Go to your Firebase Console (https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the web app (</>) icon
7. Copy the config values from the provided configuration object

## Important Notes

- All environment variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- Restart your development server after adding the `.env.local` file
- Never commit your `.env.local` file to version control 