import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

async function updateOrganizerRole() {
  console.log('Updating organizer user role...');
  
  try {
    // First, sign in as organizer to get the user ID
    const userCredential = await signInWithEmailAndPassword(auth, 'organiser@vesello.com', 'organiser123');
    const user = userCredential.user;
    
    console.log('✅ Signed in as organizer, user ID:', user.uid);
    
    // Get the user document
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      console.log('✅ User document exists, updating role to organizer...');
      
      // Update the user's role to organizer
      await updateDoc(userDocRef, {
        role: 'organizer',
        lastLogin: new Date()
      });
      
      console.log('✅ Successfully updated organizer role!');
    } else {
      console.log('❌ User document does not exist, creating it...');
      
      // Create the user document with organizer role
      const userProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: 'Event Organizer',
        role: 'organizer',
        createdAt: new Date(),
        lastLogin: new Date(),
        eventId: '' // Organizers can have an eventId
      };
      
      await setDoc(userDocRef, userProfile);
      console.log('✅ Created user document with organizer role!');
    }
    
    console.log('\n🎉 Organizer user role updated successfully!');
    console.log('You can now log in with organiser@vesello.com / organiser123 and access the dashboard.');
    
  } catch (error) {
    console.error('❌ Error updating organizer role:', error);
  }
}

updateOrganizerRole(); 