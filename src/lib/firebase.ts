import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Only initialize if no apps exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Get firestore explicitly with the database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
