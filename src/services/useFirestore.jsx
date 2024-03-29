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

export const useFirestore = () => ({
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
  listenerUser: (id) => {
    const docRef = doc(db, `/users/${id}`);
    onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
      return false;
    });
  },
  getUsersBuildingsInfo: async (buildings) => {
    try {
      const docRef = collection(db, 'buildings');
      const queryRef = query(docRef, where('nickname', 'in', buildings));
      const dataSnapshot = await getDocs(queryRef);
      const list = [];
      dataSnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        list.push(doc.data());
      });
      return list;
    } catch (error) {
      console.log(error);
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
  getBuildingListFromUser: async (id) => {
    const user = getUser(id);
    if (user) {
      return user.buildingsList;
    }
    return false;
  },
  getBuildingDescription: async (nickname) => {
    try {
      const docRef = doc(db, `/buildings/${nickname}`);
      const data = await getDoc(docRef);
      if (data.exists()) {
        const docData = data.data();
        console.log('buildingDescription', docData);
        return docData;
      }
    } catch (e) {
      console.log(e);
    }
  },

  updateUserBuildingsList: async (id, newBuilding) => {
    try {
      await updateDoc(doc(db, 'users', id), {
        buildingsList: arrayUnion(newBuilding),
      });
    } catch (error) {
      console.log(error);
    }
  },

  addBuilding: async (
    nickname,
    url = 'https://placehold.co/400x500/736b66/403d39'
  ) => {
    try {
      await setDoc(doc(db, 'buildings', `${nickname}`), {
        nickname: nickname,
        url: url,
        places: [],
      });
    } catch (e) {
      return e;
    }
  },
  getAllBuilding: async (building) => {
    const buildings = query(collection(db, `/${building}`));
    const querySnapshot = await getDocs(buildings);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  },

  includeOs: async (
    building,
    osNumber,
    activity,
    orderBy,
    didBy,
    place,
    materialsUsed
  ) => {
    try {
      const docRef = await updateDoc(doc(db, 'osLists', `${building}`), {
        os: arrayUnion({
          osNumber: osNumber,
          timestamp: serverTimestamp(),
          activity: activity,
          place: place,
          orderBy: orderBy,
          didBy: didBy,
          materialsUsed: materialsUsed,
        }),
      });
      console.log('Document written with ID: ', docRef.id);
      console.log('Document writted: ', docRef);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },

  getAllOsByBuilding: async (building) => {
    const osList = query(collectionGroup(db, `/osLists/${building}`));
    const querySnapshot = await getDocs(osList);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  },

  addOsList: async (building) => {
    try {
      const docRef = doc();
      await setDoc(doc(db, 'osLists', building), {
        osList: [],
      });
      console.log('initialized OsList: ', building);
    } catch (e) {
      return e;
    }
  },
});
