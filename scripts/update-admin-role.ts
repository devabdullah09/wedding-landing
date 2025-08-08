import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

async function updateAdminRole() {
  console.log('Updating admin user role...');
  
  try {
    // First, sign in as admin to get the user ID
    const userCredential = await signInWithEmailAndPassword(auth, 'admin@vesello.com', 'admin123');
    const user = userCredential.user;
    
    console.log('✅ Signed in as admin, user ID:', user.uid);
    
    // Get the user document
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      console.log('✅ User document exists, updating role to superadmin...');
      
      // Update the user's role to superadmin
      await updateDoc(userDocRef, {
        role: 'superadmin',
        lastLogin: new Date()
      });
      
      console.log('✅ Successfully updated admin role to superadmin!');
    } else {
      console.log('❌ User document does not exist, creating it...');
      
      // Create the user document with superadmin role
      const userProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: 'Super Admin',
        role: 'superadmin',
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await updateDoc(userDocRef, userProfile);
      console.log('✅ Created user document with superadmin role!');
    }
    
    console.log('\n🎉 Admin user role updated successfully!');
    console.log('You can now log in with admin@vesello.com / admin123 and access the dashboard.');
    
  } catch (error) {
    console.error('❌ Error updating admin role:', error);
  }
}

updateAdminRole(); 