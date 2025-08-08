import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface WeddingEvent {
  id?: string;
  title: string;
  coupleNames: string;
  date: Date;
  venue: string;
  description?: string;
  organizerId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    allowRSVP: boolean;
    allowGalleryUpload: boolean;
    requireApproval: boolean;
    maxGuests?: number;
  };
}

export interface Guest {
  id?: string;
  eventId: string;
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  isChild: boolean;
  age?: string;
  rsvpStatus: 'pending' | 'attending' | 'not_attending' | 'maybe';
  plusOnes: Guest[];
  dietaryRestrictions?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVPResponse {
  id?: string;
  eventId: string;
  mainGuestId: string;
  response: 'attending' | 'not_attending' | 'maybe';
  guestCount: number;
  dietaryRestrictions?: string[];
  notes?: string;
  submittedAt: Date;
}

export interface GalleryItem {
  id?: string;
  eventId: string;
  uploadedBy: string;
  fileName: string;
  fileUrl: string;
  fileType: 'image' | 'video';
  isApproved: boolean;
  uploadedAt: Date;
  tags?: string[];
}

// Event Management
export const createEvent = async (eventData: Omit<WeddingEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const eventWithTimestamps = {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'events'), eventWithTimestamps);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventId: string, updates: Partial<WeddingEvent>): Promise<void> => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (eventId: string): Promise<WeddingEvent | null> => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', eventId));
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() } as WeddingEvent;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getEventsByOrganizer = async (organizerId: string): Promise<WeddingEvent[]> => {
  try {
    const q = query(
      collection(db, 'events'),
      where('organizerId', '==', organizerId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WeddingEvent[];
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = async (): Promise<WeddingEvent[]> => {
  try {
    const q = query(
      collection(db, 'events'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WeddingEvent[];
  } catch (error) {
    throw error;
  }
};

// Guest Management
export const addGuest = async (guestData: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const guestWithTimestamps = {
      ...guestData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'guests'), guestWithTimestamps);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateGuest = async (guestId: string, updates: Partial<Guest>): Promise<void> => {
  try {
    const guestRef = doc(db, 'guests', guestId);
    await updateDoc(guestRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

export const getGuestsByEvent = async (eventId: string): Promise<Guest[]> => {
  try {
    const q = query(
      collection(db, 'guests'),
      where('eventId', '==', eventId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Guest[];
  } catch (error) {
    throw error;
  }
};

// RSVP Management
export const submitRSVP = async (rsvpData: Omit<RSVPResponse, 'id' | 'submittedAt'>): Promise<string> => {
  try {
    const rsvpWithTimestamp = {
      ...rsvpData,
      submittedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'rsvp_responses'), rsvpWithTimestamp);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getRSVPResponsesByEvent = async (eventId: string): Promise<RSVPResponse[]> => {
  try {
    const q = query(
      collection(db, 'rsvp_responses'),
      where('eventId', '==', eventId),
      orderBy('submittedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RSVPResponse[];
  } catch (error) {
    throw error;
  }
};

// Gallery Management
export const addGalleryItem = async (itemData: Omit<GalleryItem, 'id' | 'uploadedAt'>): Promise<string> => {
  try {
    const itemWithTimestamp = {
      ...itemData,
      uploadedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'gallery_items'), itemWithTimestamp);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateGalleryItem = async (itemId: string, updates: Partial<GalleryItem>): Promise<void> => {
  try {
    const itemRef = doc(db, 'gallery_items', itemId);
    await updateDoc(itemRef, updates);
  } catch (error) {
    throw error;
  }
};

export const getGalleryItemsByEvent = async (eventId: string, approvedOnly: boolean = false): Promise<GalleryItem[]> => {
  try {
    let q = query(
      collection(db, 'gallery_items'),
      where('eventId', '==', eventId)
    );
    
    if (approvedOnly) {
      q = query(q, where('isApproved', '==', true));
    }
    
    q = query(q, orderBy('uploadedAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GalleryItem[];
  } catch (error) {
    throw error;
  }
}; 