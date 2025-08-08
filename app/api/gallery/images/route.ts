import { NextRequest, NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const albumType = searchParams.get('albumType'); // 'wedding-day' or 'party-day'
    const mediaType = searchParams.get('mediaType'); // 'photos' or 'videos'

    if (!albumType || !mediaType) {
      return NextResponse.json({ error: 'Album type and media type are required' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', albumType, mediaType);
    
    // Check if directory exists
    if (!existsSync(uploadDir)) {
      return NextResponse.json({ files: [] });
    }

    // Read all files in the directory
    const files = await readdir(uploadDir);
    
    // Filter for image/video files and create public URLs
    const mediaFiles = files
      .filter(file => {
        const ext = file.toLowerCase();
        if (mediaType === 'photos') {
          return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.gif') || ext.endsWith('.webp');
        } else {
          return ext.endsWith('.mp4') || ext.endsWith('.mov') || ext.endsWith('.avi') || ext.endsWith('.webm');
        }
      })
      .map(file => ({
        url: `/uploads/${albumType}/${mediaType}/${file}`,
        filename: file,
        uploadedAt: new Date(parseInt(file.split('_')[0])).toISOString()
      }))
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()); // Sort by newest first

    return NextResponse.json({ 
      success: true, 
      files: mediaFiles,
      count: mediaFiles.length
    });

  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 