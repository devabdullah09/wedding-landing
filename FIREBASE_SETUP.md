# Firebase Setup Guide - Fix Permission Denied Error

## 🚨 **Current Issue**

You're getting a `PERMISSION_DENIED: Missing or insufficient permissions` error when trying to submit RSVPs.

## 🔧 **Quick Fix - Enable Firestore**

### Step 1: Go to Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `vasello-a471e`

### Step 2: Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location (choose the closest to your users)
5. Click **"Enable"**

### Step 3: Update Security Rules

1. In Firestore Database, click the **"Rules"** tab
2. Replace the rules with this development-friendly version:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

## 🚨 **Security Warning**

⚠️ **The rules above allow anyone to read/write to your database. Only use for development!**

## 🔒 **Production Security Rules**

For production, use these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write RSVPs
    match /invitation_rsvps/{document} {
      allow read, write: if request.auth != null;
    }

    // Allow public read access to events
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🧪 **Test the Fix**

### Test 1: Check Firestore Connection

1. Go to: `http://localhost:3000/api/invitation/test-firebase`
2. You should see: `"Firebase connection successful"`

### Test 2: Submit an RSVP

1. Go through the invitation flow
2. Try submitting an RSVP
3. Check if it goes to Firebase or local storage

### Test 3: Check Dashboard

1. Go to: `http://localhost:3000/invitation/dashboard`
2. You should see submitted RSVPs

## 🔍 **Alternative Solutions**

### Option 1: Use Firebase Emulator (Local Development)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Start emulators
firebase emulators:start
```

### Option 2: Use Local Storage Only

The system now has a fallback to local storage, so RSVPs will still be saved temporarily.

## 📱 **Current Status**

- ✅ **Skip Button Added** - You can now continue to the next page
- ✅ **Local Storage Fallback** - RSVPs are saved locally if Firebase fails
- ✅ **Better Error Handling** - Clear error messages about what's wrong
- ⚠️ **Firebase Permissions** - Need to be configured in Firebase Console

## 🎯 **Next Steps**

1. **Use the Skip Button** to continue testing the flow
2. **Fix Firebase permissions** using the steps above
3. **Test RSVP submission** once Firestore is enabled
4. **Check the dashboard** to see submitted RSVPs

## 🆘 **Still Having Issues?**

If you continue to have problems:

1. Check Firebase Console for any error messages
2. Verify your Firebase project ID matches `vasello-a471e`
3. Ensure Firestore is enabled in the correct region
4. Check if there are any billing issues with your Firebase project
