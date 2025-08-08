# Gallery Upload System

This document describes the gallery upload functionality implemented for the wedding landing page.

## Features

- **Image and Video Upload**: Users can upload photos and videos to either "Wedding Day" or "Party Day" albums
- **Real-time Sharing**: All uploaded images are immediately visible to anyone with the gallery link
- **File Storage**: Images are stored locally in the `public/uploads/` directory
- **Progress Tracking**: Upload progress is shown with a loading overlay
- **Success Confirmation**: Users see a success message after upload completion

## File Structure

```
public/uploads/
├── wedding-day/
│   ├── photos/
│   └── videos/
└── party-day/
    ├── photos/
    └── videos/
```

## API Endpoints

### Upload Files

- **POST** `/api/gallery/upload`
- **Parameters**:
  - `files`: Array of files to upload
  - `albumType`: 'wedding-day' or 'party-day'
  - `mediaType`: 'photos' or 'videos'

### Fetch Gallery Files

- **GET** `/api/gallery/images`
- **Query Parameters**:
  - `albumType`: 'wedding-day' or 'party-day'
  - `mediaType`: 'photos' or 'videos'

## User Flow

1. User visits `/gallery` page
2. Clicks "Add Your Photos & Videos Now"
3. Selects album type (Wedding Day or Party Day)
4. Chooses media type (Photos or Videos)
5. Clicks upload button and selects files
6. Upload progress is shown
7. Success message appears
8. Images are immediately visible to all users

## Technical Implementation

- **Frontend**: React with TypeScript, using Next.js
- **Backend**: Next.js API routes
- **Storage**: Local file system (no external dependencies)
- **File Naming**: Timestamp + random string for uniqueness
- **Supported Formats**:
  - Images: JPG, JPEG, PNG, GIF, WebP
  - Videos: MP4, MOV, AVI, WebM

## Security Notes

- Files are stored in the public directory and are accessible via direct URLs
- No authentication required for viewing (as per requirements)
- File size limits should be configured based on server capacity
- Consider implementing file type validation on the server side

## Deployment Considerations

- Ensure the `public/uploads/` directory has write permissions
- Consider implementing file size limits
- Monitor disk space usage
- Consider implementing cleanup for old files if needed
