import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserRole {
  role: 'superadmin' | 'organizer' | 'guest';
  eventId?: string; // For organizers managing specific events
}

export interface UserProfile extends UserRole {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  lastLogin: Date;
}

// Authentication functions
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check if user document exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      // Update last login if document exists
      await updateDoc(userDocRef, {
        lastLogin: new Date()
      });
    } else {
      // Create user document if it doesn't exist
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || '',
        role: 'guest', // Default role for existing users
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await setDoc(userDocRef, userProfile);
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (email: string, password: string, role: UserRole['role'], displayName?: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile if display name provided
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    // Create user document in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || user.displayName || '',
      role,
      createdAt: new Date(),
      lastLogin: new Date(),
      ...(role === 'organizer' && { eventId: '' })
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user has specific role
export const hasRole = (userProfile: UserProfile | null, requiredRole: UserRole['role']): boolean => {
  if (!userProfile) return false;
  
  const roleHierarchy = {
    superadmin: 3,
    organizer: 2,
    guest: 1
  };
  
  return roleHierarchy[userProfile.role] >= roleHierarchy[requiredRole];
}; 