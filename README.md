# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Setting up Firebase

To connect the application to your Firebase project, you need to provide your project's credentials.

### Where to find your Firebase credentials

1.  **Go to the Firebase Console:** Open [console.firebase.google.com](https://console.firebase.google.com).
2.  **Select your project.**
3.  **Go to Project Settings:** Click the gear icon (⚙️) next to "Project Overview" and select "Project settings".
4.  **Find "Your apps":** In the "General" tab, scroll down to the "Your apps" card.
5.  **Select your web app:** If you haven't created a web app yet, click the `</>` icon and follow the steps.
6.  **Find the config object:** In your web app's settings, find the "SDK setup and configuration" section and select the "Config" option.

You will see a `firebaseConfig` object. The values in this object correspond to the variables you need to set.

### How to use your credentials

1.  Create a new file named `.env.local` in the `src` directory.
2.  Copy the content from `src/.env.example` into your new `src/.env.local` file.
3.  Replace the placeholder values in `src/.env.local` with the actual credentials you found in your Firebase project settings.

**Example `firebaseConfig` object:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy..._w",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef...",
  measurementId: "G-ABCDEFGHIJ"
};
```

You will map these values to the variables in your `.env.local` file.
