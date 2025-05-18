import {create} from "zustand"; 
import { fetchToyById,fetchToysFromFirestore, 
	addToyToFirestore,
	updateToyInFirestore,
	removeToyFromFirestore,  } from "./firestoreService";


const useToyStore = create((set) => ({ 
  // --- Data från Firestore ---
  toys: [], 
  selectedToy: null,
  isLoading: true, 
  error: null, 
  hasFetched: false, 


  // Funktioner för att uppdatera data från Firestore (används av useFetchToys)
    // --- Funktioner för att uppdatera tillstånd ---
  setToys: (toys) => set({ toys }),
  setSelectedToy: (toy) => set({ selectedToy: toy }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setHasFetched: (hasFetched) => set({ hasFetched }), // 

  // --- Funktioner för att interagera med Firestore ---
  fetchToys: async () => {

    set({ isLoading: true, error: null, hasFetched: true }); 
    try {
      const toys = await fetchToysFromFirestore();
      set({ toys: toys, isLoading: false  });
    } catch (error) {
      set({ error: error.message, isLoading: false });
	  set({ hasFetched: false });
	  
    } 
  },
  fetchToyById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const toy = await fetchToyById(id);
      set({ selectedToy: toy, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
	}
  },
  addToy: async (toy) => {
    set({ isLoading: true, error: null });
    try {
      const newToy = await addToyToFirestore(toy);
      set((state) => ({ toys: [...state.toys, newToy] , isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } 
  },
  updateToy: async (toy) => {
    set({ isLoading: true, error: null });
    try {
      await updateToyInFirestore(toy);
      set((state) => ({
        toys: state.toys.map((t) => (t.id === toy.id ? { ...t, ...toy } : t)), 
		isLoading: false, 
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } 
  },
  removeToy: async (toyId) => {
    set({ isLoading: true, error: null });
    try {
      await removeToyFromFirestore(toyId);
      set((state) => ({
        toys: state.toys.filter((t) => t.id !== toyId), isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    } 
  },

})); 


export { useToyStore };
