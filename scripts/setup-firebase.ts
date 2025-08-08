import { createUser } from '../lib/auth';
import { createEvent } from '../lib/events';

async function setupFirebase() {
  console.log('Setting up Firebase with initial data...');
  
  try {
    // Create initial users
    console.log('Creating initial users...');
    
    // Superadmin user
    await createUser('admin@vesello.com', 'admin123', 'superadmin', 'Super Admin');
    console.log('✅ Superadmin user created: admin@vesello.com / admin123');
    
    // Organizer user
    await createUser('organizer@example.com', 'organizer123', 'organizer', 'Event Organizer');
    console.log('✅ Organizer user created: organizer@example.com / organizer123');
    
    // Test organizer user
    await createUser('test@wedding.com', 'test123', 'organizer', 'Test Wedding Organizer');
    console.log('✅ Test organizer user created: test@wedding.com / test123');
    
    console.log('\n🎉 Firebase setup completed successfully!');
    console.log('\nYou can now log in with any of these accounts:');
    console.log('- admin@vesello.com / admin123 (Super Admin)');
    console.log('- organizer@example.com / organizer123 (Organizer)');
    console.log('- test@wedding.com / test123 (Test Organizer)');
    
  } catch (error) {
    console.error('❌ Error setting up Firebase:', error);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  setupFirebase();
}

export default setupFirebase; 