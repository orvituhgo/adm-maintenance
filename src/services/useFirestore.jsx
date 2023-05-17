import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  query,
  collectionGroup,
  getDocs,
  updateDoc,
  arrayUnion,
  getDoc,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../configs/firebase';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContextProvider';

export const useFirestore = () => {
  const { user, getLoginToken } = useContext(LoginContext);

  return {
    addUser: async (id, email) => {
      try {
        const docRef = await setDoc(doc(db, 'users', id), {
          userId: id,
          email: email,
          buildingsList: [],
        });
        console.log('Document written with ID: ', docRef.userId);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    getUser: async (id) => {
      try {
        const docRef = doc(db, `/users/${id}`);
        const data = await getDoc(docRef);
        if (data.exists()) {
          const docData = data.data();
          return docData;
        }
      } catch (e) {
        console.log(error);
      }
    },
    updateUserBuildingList: async (building) => {
      try {
        const uid = getLoginToken().uid;
        const docRef = doc(db, 'users', uid.toString());
        await updateDoc(docRef, {
          buildingsList: arrayUnion(building),
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    addBuilding: async (nickname, url) => {
      try {
        const docRef = doc(db, `/buildings/${nickname}`);
        await setDoc(docRef, {
          building: nickname,
          url: url,
          places: [],
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    // includeOs: async (
    //   building,
    //   osNumber,
    //   activity,
    //   orderBy,
    //   didBy,
    //   place,
    //   materialsUsed
    // ) => {
    //   try {
    //     const docRef = await updateDoc(doc(db, 'osLists', `${building}`), {
    //       os: arrayUnion({
    //         osNumber: osNumber,
    //         timestamp: serverTimestamp(),
    //         activity: activity,
    //         place: place,
    //         orderBy: orderBy,
    //         didBy: didBy,
    //         materialsUsed: materialsUsed,
    //       }),
    //     });
    //     console.log('Document written with ID: ', docRef.id);
    //     console.log('Document writted: ', docRef);
    //   } catch (e) {
    //     console.error('Error adding document: ', e);
    //   }
    // },
  };
};
