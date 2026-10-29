# Class Aquarium (Vercel + Firebase Firestore)

## 1. Firebase
1. console.firebase.google.com → create a project → Build → **Firestore Database** → Create database (production mode).
2. Firestore → **Rules** tab → paste the contents of `firestore.rules` → Publish.
3. Firestore → **Data** tab → Start collection `config` → Document ID `teacher` → field `code` (string) = your secret teacher sign-up code.
4. Project settings → Your apps → add a **Web app** → copy the config into `public/firebase-config.js`.

## 2. Vercel
Push this folder to GitHub, import it in Vercel (no build command needed; `vercel.json` serves `public/`). Deploy.

## 3. Use it
Open `https://your-app.vercel.app/#teacher`, sign up (enter your sign-up code when asked), create students, share the student link.

Local test: `cd public && npx serve` (needs the Firebase config filled in).
