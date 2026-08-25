import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';

export const logUssdSearch = async (code: string, titleKey: string) => {
  try {
    const codeRef = doc(db, 'ussd_searches', code);
    const docSnap = await getDoc(codeRef);

    if (docSnap.exists()) {
      await updateDoc(codeRef, {
        count: increment(1),
        lastSearched: new Date().toISOString()
      });
    } else {
      await setDoc(codeRef, {
        code,
        titleKey,
        count: 1,
        lastSearched: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("Error logging USSD search:", error);
  }
};
