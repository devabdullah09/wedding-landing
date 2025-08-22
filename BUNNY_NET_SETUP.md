# Bunny.net Integration Setup Guide

This guide will help you set up Bunny.net for your wedding gallery media hosting.

## What You Need from Your Client

### 1. Bunny.net Account Access

- The client must have a Bunny.net account
- They need to create a Storage Zone for media uploads
- They need to set up a Pull Zone (CDN) for serving media

### 2. Required Credentials

Based on your dashboard, you already have:

- **Storage Zone**: `wedding-app-storage`
- **CDN Zone**: `wedding-app-cdn` with hostname `cdn.vesello.net`

### 3. Storage API Key

The client needs to generate a Storage API Key:

1. Go to Bunny.net Dashboard
2. Navigate to Storage > `wedding-app-storage`
3. Go to "API Access" tab
4. Generate a new API key
5. Copy the API key

## Environment Variables Setup

Create a `.env.local` file in your project root with:

```bash
# Bunny.net Configuration
BUNNY_NET_STORAGE_ZONE=wedding-app-storage
BUNNY_NET_STORAGE_API_KEY=your_storage_api_key_here
BUNNY_NET_STORAGE_ENDPOINT=https://storage.bunnycdn.com/wedding-app-storage
BUNNY_NET_CDN_URL=https://cdn.vesello.net
NEXT_PUBLIC_BUNNY_NET_CDN_URL=https://cdn.vesello.net
```

## How It Works

### 1. File Upload Flow

1. User selects files on the frontend
2. Files are sent to `/api/gallery/upload`
3. API uploads files directly to Bunny.net Storage
4. Files are organized by album type and media type
5. CDN URLs are generated for serving

### 2. File Serving Flow

1. Gallery requests files from `/api/gallery/images`
2. API fetches file list from Bunny.net Storage
3. CDN URLs are generated for each file
4. Frontend displays images/videos from CDN

### 3. File Structure on Bunny.net

```
wedding-app-storage/
├── wedding-day/
│   ├── photos/
│   │   ├── 1754636656184_jsbcez9ovqm.jpg
│   │   └── ...
│   └── videos/
│       └── ...
└── party-day/
    ├── photos/
    └── videos/
```

## Benefits of This Setup

1. **Global CDN**: Fast media delivery worldwide
2. **Scalable Storage**: No local storage limitations
3. **Production Ready**: Works on Vercel and other hosting platforms
4. **Cost Effective**: Pay only for storage and bandwidth used
5. **Automatic Optimization**: Bunny.net handles image/video optimization

## Testing the Integration

1. Set up environment variables
2. Upload a test image/video
3. Check if it appears in the gallery
4. Verify the file is served from CDN URL

## Troubleshooting

### Common Issues

1. **"Upload failed" error**

   - Check if Storage API Key is correct
   - Verify Storage Zone name matches
   - Ensure API key has write permissions

2. **Files not appearing in gallery**

   - Check if files were uploaded to correct paths
   - Verify CDN URL is accessible
   - Check browser console for errors

3. **CORS issues**
   - Bunny.net handles CORS automatically
   - If issues persist, check your Next.js CORS settings

### Debug Steps

1. Check browser Network tab for upload requests
2. Verify API responses in browser console
3. Check server logs for detailed error messages
4. Test Bunny.net API endpoints directly

## Security Considerations

1. **API Key Protection**: Never expose the Storage API Key in client-side code
2. **File Validation**: Server validates file types and sizes
3. **Access Control**: Consider implementing user authentication for uploads
4. **Rate Limiting**: Implement upload rate limiting if needed

## Cost Estimation

Bunny.net pricing (approximate):

- **Storage**: $0.01 per GB per month
- **Bandwidth**: $0.01 per GB
- **CDN Requests**: $0.01 per 10,000 requests

For a typical wedding gallery:

- 100 photos (5MB each) = 0.5GB storage
- Monthly cost: ~$0.005 + bandwidth costs

## Support

If you encounter issues:

1. Check Bunny.net documentation: https://docs.bunny.net/
2. Verify your configuration matches the examples
3. Test with a simple file upload first
4. Check Bunny.net dashboard for any service issues
