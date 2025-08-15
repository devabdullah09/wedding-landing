import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { InvitationRSVP, InvitationGuest } from './invitation-types';

// Submit a complete RSVP response
export const submitInvitationRSVP = async (rsvpData: Omit<InvitationRSVP, 'id' | 'submittedAt' | 'status'>): Promise<string> => {
  try {
    console.log('submitInvitationRSVP called with data:', JSON.stringify(rsvpData, null, 2));
    
    const rsvpWithMetadata = {
      ...rsvpData,
      submittedAt: serverTimestamp(),
      status: 'pending' as const
    };
    
    console.log('RSVP data with metadata:', JSON.stringify(rsvpWithMetadata, null, 2));
    console.log('Firebase db object:', db);
    console.log('Collection name: invitation_rsvps');
    
    const docRef = await addDoc(collection(db, 'invitation_rsvps'), rsvpWithMetadata);
    console.log('Document added successfully with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('Error in submitInvitationRSVP:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown error type'
    });
    throw error;
  }
};

// Get RSVP by ID
export const getInvitationRSVP = async (rsvpId: string): Promise<InvitationRSVP | null> => {
  try {
    const rsvpDoc = await getDoc(doc(db, 'invitation_rsvps', rsvpId));
    if (rsvpDoc.exists()) {
      const data = rsvpDoc.data();
      return {
        id: rsvpDoc.id,
        ...data,
        submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate() : new Date(data.submittedAt)
      } as InvitationRSVP;
    }
    return null;
  } catch (error) {
    console.error('Error getting RSVP:', error);
    throw error;
  }
};

// Get all RSVPs for an event
export const getInvitationRSVPsByEvent = async (eventId: string): Promise<InvitationRSVP[]> => {
  try {
    const q = query(
      collection(db, 'invitation_rsvps'),
      where('eventId', '==', eventId),
      orderBy('submittedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate() : new Date(data.submittedAt)
      } as InvitationRSVP;
    });
  } catch (error) {
    console.error('Error getting RSVPs by event:', error);
    throw error;
  }
};

// Update RSVP status
export const updateInvitationRSVPStatus = async (rsvpId: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<void> => {
  try {
    const rsvpRef = doc(db, 'invitation_rsvps', rsvpId);
    await updateDoc(rsvpRef, { status });
  } catch (error) {
    console.error('Error updating RSVP status:', error);
    throw error;
  }
};

// Get RSVP statistics for an event
export const getInvitationRSVPStats = async (eventId: string) => {
  try {
    const rsvps = await getInvitationRSVPsByEvent(eventId);
    
    const stats = {
      total: rsvps.length,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      totalGuests: 0,
      weddingDayAttending: 0,
      afterPartyAttending: 0,
      dietaryPreferences: {
        Regular: 0,
        Vegetarian: 0,
        Vegan: 0
      },
      accommodationNeeded: 0,
      transportationNeeded: 0
    };

    rsvps.forEach(rsvp => {
      // Count by status
      stats[rsvp.status]++;
      
      // Count total guests
      const totalGuests = 1 + rsvp.additionalGuests.length;
      stats.totalGuests += totalGuests;
      
      // Count attendance
      Object.values(rsvp.weddingDayAttendance).forEach(attendance => {
        if (attendance === 'will') stats.weddingDayAttending++;
      });
      
      Object.values(rsvp.afterPartyAttendance).forEach(attendance => {
        if (attendance === 'will') stats.afterPartyAttending++;
      });
      
      // Count dietary preferences
      Object.values(rsvp.foodPreferences).forEach(preference => {
        if (preference in stats.dietaryPreferences) {
          stats.dietaryPreferences[preference as keyof typeof stats.dietaryPreferences]++;
        }
      });
      
      // Count accommodation and transportation needs
      Object.values(rsvp.accommodationNeeded).forEach(needed => {
        if (needed === 'Yes') stats.accommodationNeeded++;
      });
      
      Object.values(rsvp.transportationNeeded).forEach(needed => {
        if (needed === 'Yes') stats.transportationNeeded++;
      });
    });

    return stats;
  } catch (error) {
    console.error('Error getting RSVP stats:', error);
    throw error;
  }
};

// Helper function to get all guest names from an RSVP
export const getAllGuestNames = (rsvp: InvitationRSVP): string[] => {
  const names = [rsvp.mainGuest.name];
  rsvp.additionalGuests.forEach(guest => {
    names.push(guest.name);
  });
  return names;
};

// Helper function to get guest by name
export const getGuestByName = (rsvp: InvitationRSVP, guestName: string): InvitationGuest | null => {
  if (rsvp.mainGuest.name === guestName) {
    return rsvp.mainGuest;
  }
  
  const additionalGuest = rsvp.additionalGuests.find(guest => guest.name === guestName);
  return additionalGuest || null;
};
