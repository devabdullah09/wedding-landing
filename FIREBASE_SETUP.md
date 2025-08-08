# Firebase Backend Setup Guide

This guide will help you set up Firebase as the backend for your wedding landing page application.

## Prerequisites

- Node.js and npm installed
- Firebase account (free tier is sufficient)
- Git repository for your project

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "wedding-landing-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firebase Services

### Authentication

1. In Firebase Console, go to "Authentication" → "Get started"
2. Click "Sign-in method" tab
3. Enable "Email/Password" authentication
4. Click "Save"

### Firestore Database

1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location close to your users
4. Click "Done"

### Storage

1. Go to "Storage" → "Get started"
2. Choose "Start in test mode" (for development)
3. Select a location close to your users
4. Click "Done"

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "wedding-landing-web")
5. Copy the configuration object

## Step 4: Configure Environment Variables

1. Copy `env.example` to `.env.local`
2. Replace the placeholder values with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 5: Set Up Firestore Security Rules

In Firebase Console, go to Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Events: organizers can manage their events, superadmins can manage all
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && (
        resource.data.organizerId == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superadmin'
      );
    }

    // Guests: organizers can manage guests for their events
    match /guests/{guestId} {
      allow read, write: if request.auth != null && (
        resource.data.eventId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.eventId ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superadmin'
      );
    }

    // RSVP responses: organizers can read responses for their events
    match /rsvp_responses/{responseId} {
      allow read: if request.auth != null && (
        resource.data.eventId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.eventId ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superadmin'
      );
      allow write: if request.auth != null; // Anyone can submit RSVP
    }

    // Gallery items: organizers can manage items for their events
    match /gallery_items/{itemId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && (
        resource.data.eventId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.eventId ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superadmin'
      );
    }
  }
}
```

## Step 6: Set Up Storage Security Rules

In Firebase Console, go to Storage → Rules and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Gallery uploads: anyone can upload, organizers can manage
    match /gallery/{eventId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Event files: organizers can manage their event files
    match /events/{eventId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && (
        // Check if user is organizer for this event
        exists(/databases/$(database)/documents/events/$(eventId)) &&
        get(/databases/$(database)/documents/events/$(eventId)).data.organizerId == request.auth.uid
      );
    }
  }
}
```

## Step 7: Create Initial Users

You'll need to create initial users for testing. You can do this through the Firebase Console or programmatically.

### Option 1: Firebase Console

1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Create at least one superadmin user

### Option 2: Programmatic Creation

Create a script to set up initial users:

```typescript
// scripts/create-users.ts
import { createUser } from "@/lib/auth";

async function createInitialUsers() {
  try {
    // Create superadmin
    await createUser(
      "admin@vesello.com",
      "admin123",
      "superadmin",
      "Super Admin"
    );

    // Create organizer
    await createUser(
      "organizer@example.com",
      "organizer123",
      "organizer",
      "Event Organizer"
    );

    console.log("Initial users created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
  }
}

createInitialUsers();
```

## Step 8: Test the Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `/login` and try logging in with the credentials you created

3. Check the Firebase Console to see if authentication and data are working

## Step 9: Development with Firebase Emulators (Optional)

For local development without affecting production data:

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:

   ```bash
   firebase init emulators
   ```

4. Start emulators:

   ```bash
   firebase emulators:start
   ```

5. Update your `.env.local` to use emulators:
   ```env
   NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
   NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST=localhost:8080
   NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199
   ```

## Database Schema

Your Firestore database will have these collections:

### users

- `uid`: string (Firebase Auth UID)
- `email`: string
- `displayName`: string
- `role`: 'superadmin' | 'organizer' | 'guest'
- `eventId`: string (for organizers)
- `createdAt`: timestamp
- `lastLogin`: timestamp

### events

- `id`: string (auto-generated)
- `title`: string
- `coupleNames`: string
- `date`: timestamp
- `venue`: string
- `description`: string
- `organizerId`: string
- `isActive`: boolean
- `settings`: object
- `createdAt`: timestamp
- `updatedAt`: timestamp

### guests

- `id`: string (auto-generated)
- `eventId`: string
- `name`: string
- `surname`: string
- `email`: string
- `phone`: string
- `isChild`: boolean
- `age`: string
- `rsvpStatus`: string
- `plusOnes`: array
- `dietaryRestrictions`: array
- `notes`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp

### rsvp_responses

- `id`: string (auto-generated)
- `eventId`: string
- `mainGuestId`: string
- `response`: string
- `guestCount`: number
- `dietaryRestrictions`: array
- `notes`: string
- `submittedAt`: timestamp

### gallery_items

- `id`: string (auto-generated)
- `eventId`: string
- `uploadedBy`: string
- `fileName`: string
- `fileUrl`: string
- `fileType`: string
- `isApproved`: boolean
- `uploadedAt`: timestamp
- `tags`: array

## Next Steps

1. **Implement Event Management**: Create forms to add/edit events
2. **RSVP System**: Connect the invitation forms to Firebase
3. **Gallery Upload**: Implement file upload functionality
4. **Dashboard Analytics**: Create real-time statistics
5. **QR Code Generation**: Add QR code functionality for invitations
6. **Email Notifications**: Set up Firebase Functions for email sending

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check if Firebase Auth is enabled and rules are correct
2. **Database access denied**: Verify Firestore security rules
3. **File upload fails**: Check Storage security rules and bucket permissions
4. **Environment variables not loading**: Ensure `.env.local` is in the root directory

### Debug Mode

Enable debug logging by adding to your Firebase config:

```typescript
// lib/firebase.ts
if (process.env.NODE_ENV === "development") {
  console.log("Firebase config:", firebaseConfig);
}
```

## Security Best Practices

1. **Never expose Firebase admin keys in client-side code**
2. **Use Firebase Functions for sensitive operations**
3. **Implement proper validation on both client and server**
4. **Regularly review and update security rules**
5. **Monitor Firebase usage and costs**

## Deployment

When deploying to production:

1. Update security rules to be more restrictive
2. Set up proper authentication methods
3. Configure custom domains if needed
4. Set up monitoring and alerts
5. Consider Firebase Functions for server-side operations

For more information, refer to the [Firebase Documentation](https://firebase.google.com/docs).
