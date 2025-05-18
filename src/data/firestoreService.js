import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./database"; 


export const fetchToysFromFirestore = async () => {
  const toysCollectionRef = collection(db, "Toys");
  const snapshot = await getDocs(toysCollectionRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const addToyToFirestore = async (toy) => {
  const toysCollectionRef = collection(db, "Toys");
  const docRef = await addDoc(toysCollectionRef, toy);
  return { id: docRef.id, ...toy };
};


export const updateToyInFirestore = async (toy) => {
  const toyDocRef = doc(db, "Toys", toy.id);
  await updateDoc(toyDocRef, toy);
};


export const removeToyFromFirestore = async (toyId) => {
  const toyDocRef = doc(db, "Toys", toyId);
  await deleteDoc(toyDocRef);
};

export const fetchToyById = async (id) => {
	const docRef = doc(db, 'Toys', id);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? docSnap.data() : null;
  };