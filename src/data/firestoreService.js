import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./database"; // Din Firestore-instans

// Hämta alla leksaker från Firestore
export const fetchToysFromFirestore = async () => {
  const toysCollectionRef = collection(db, "Toys");
  const snapshot = await getDocs(toysCollectionRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Lägg till en ny leksak i Firestore
export const addToyToFirestore = async (toy) => {
  const toysCollectionRef = collection(db, "Toys");
  const docRef = await addDoc(toysCollectionRef, toy);
  return { id: docRef.id, ...toy };
};

// Uppdatera en leksak i Firestore
export const updateToyInFirestore = async (toy) => {
  const toyDocRef = doc(db, "Toys", toy.id);
  await updateDoc(toyDocRef, toy);
};

// Ta bort en leksak från Firestore
export const removeToyFromFirestore = async (toyId) => {
  const toyDocRef = doc(db, "Toys", toyId);
  await deleteDoc(toyDocRef);
};
// firestoreServices.js
export const fetchToyById = async (id) => {
	const docRef = doc(db, 'Toys', id);
	const docSnap = await getDoc(docRef);
	return docSnap.exists() ? docSnap.data() : null;
  };