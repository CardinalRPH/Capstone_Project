
import admin from 'firebase-admin';
import serviceAccount from './cropplanner-4f93b-firebase-adminsdk-mcd2o-aa8acfd761.json' assert { type: 'json' };

const FirebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default FirebaseAdmin;


