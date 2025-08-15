import { NextRequest, NextResponse } from 'next/server';
import { getInvitationRSVPsByEvent } from '@/lib/invitation-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    
    if (!eventId) {
      return NextResponse.json(
        { error: 'eventId parameter is required' },
        { status: 400 }
      );
    }

    const rsvps = await getInvitationRSVPsByEvent(eventId);
    
    return NextResponse.json({ 
      success: true, 
      rsvps,
      count: rsvps.length
    });

  } catch (error) {
    console.error('Error getting RSVPs:', error);
    return NextResponse.json(
      { error: 'Failed to get RSVPs' },
      { status: 500 }
    );
  }
}
