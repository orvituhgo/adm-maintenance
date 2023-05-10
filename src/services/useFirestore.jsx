import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';

async function useFirestore() {
  return {
    addBuilding: async (
      nickname,
      url = 'https://placehold.co/400x500/736b66/403d39'
    ) => {
      try {
        const docRef = await addDoc(collection(db, ''), {
          nickname: nickname,
          url: url,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    getBuilding: async () => {},
  };
}
