import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('Testing Firebase connection...');
    console.log('Firebase db object:', db);
    
    // Try to read from a collection to test connectivity
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    
    return NextResponse.json({ 
      message: 'Firebase connection successful',
      dbType: typeof db,
      hasFirestore: !!db,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Firebase test failed:', error);
    
    return NextResponse.json({ 
      error: 'Firebase connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
