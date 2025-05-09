// admin.js
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // A service account key
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();
