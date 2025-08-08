import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const albumType = formData.get('albumType') as string; // 'wedding-day' or 'party-day'
    const mediaType = formData.get('mediaType') as string; // 'photos' or 'videos'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (!albumType || !mediaType) {
      return NextResponse.json({ error: 'Album type and media type are required' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads', albumType, mediaType);
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;
      
      const filePath = join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      
      // Return the public URL
      const publicUrl = `/uploads/${albumType}/${mediaType}/${fileName}`;
      uploadedFiles.push(publicUrl);
    }

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      message: `${uploadedFiles.length} file(s) uploaded successfully` 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} 