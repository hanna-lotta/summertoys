import {create} from "zustand"; 
import { fetchToyById,fetchToysFromFirestore, 
	addToyToFirestore,
	updateToyInFirestore,
	removeToyFromFirestore,  } from "./firestoreService";


const useToyStore = create((set) => ({ 
  // --- Data från Firestore ---
  toys: [], // Array för leksakslista hämtad från Firestore
  selectedToy: null,// State för den leksak som är vald för detaljvy
  isLoading: true, // Laddningsstatus för leksakslistan
  error: null, // Eventuella fel vid hämtning av leksakslistan
  hasFetched: false, // Lägg till en flagga för att spåra om data redan har hämtats


  // Funktioner för att uppdatera data från Firestore (används av useFetchToys)
    // --- Funktioner för att uppdatera tillstånd ---
  setToys: (toys) => set({ toys }),
  setSelectedToy: (toy) => set({ selectedToy: toy }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setHasFetched: (hasFetched) => set({ hasFetched }), // 

  // --- Funktioner för att interagera med Firestore ---
  fetchToys: async () => {

    set({ isLoading: true, error: null, hasFetched: true }); // Sätt isLoading till true och hasFetched till false
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


//Lägg till en setter för flaggan
  /*
  fetchToys: async () => {
    console.log("ZSA: fetchToys - Action started."); // Logg 1: Action startar
    const stateBeforeCheck = get();
    console.log("ZSA: fetchToys - State before check:", { isLoading: stateBeforeCheck.isLoading, hasFetched: stateBeforeCheck.hasFetched, toysCount: stateBeforeCheck.toys.length }); // Logg 2: State innan check

    if (stateBeforeCheck.hasFetched) {
        console.log("ZSA: fetchToys - Toys already fetched, skipping."); // Logg 3: Skippar
        return;
    }

    console.log("ZSA: fetchToys - Fetching for the first time. Setting initial loading state."); // Logg 4: Börjar fetcha
    set({ isLoading: true, error: null, hasFetched: true });
    const stateAfterInitialSet = get();
    console.log("ZSA: fetchToys - State after initial set:", { isLoading: stateAfterInitialSet.isLoading, hasFetched: stateAfterInitialSet.hasFetched }); // Logg 5: State efter första set

    try {
        console.log("ZSA: fetchToys - Awaiting fetchToysFromFirestore()."); // Logg 6: Awaitar fetch
        const toys = await fetchToysFromFirestore();
        console.log("ZSA: fetchToys - fetchToysFromFirestore() returned. Data received (count):", toys ? toys.length : 0); // Logg 7: Data mottagen

        console.log("ZSA: fetchToys - Setting final state: toys and isLoading to false."); // Logg 8: Sätter slutligt state
        set({ toys: toys, isLoading: false });
        const stateAfterFinalSet = get();
        console.log("ZSA: fetchToys - State after final set:", { isLoading: stateAfterFinalSet.isLoading, hasFetched: stateAfterFinalSet.hasFetched, toysCount: stateAfterFinalSet.toys.length }); // Logg 9: State efter sista set

        console.log("ZSA: fetchToys - Action finished successfully."); // Logg 10: Action klar (success)

    } catch (error) {
        console.error("ZSA: fetchToys - fetchToys failed:", error); // Logg 11: Action kraschar

        console.log("ZSA: fetchToys - Setting error state and isLoading/hasFetched to false."); // Logg 12: Sätter fel-state
        set({ error: error.message, isLoading: false, hasFetched: false });
        const stateAfterErrorSet = get();
        console.log("ZSA: fetchToys - State after error set:", { isLoading: stateAfterErrorSet.isLoading, hasFetched: stateAfterErrorSet.hasFetched, error: stateAfterErrorSet.error }); // Logg 13: State efter error set

        console.log("ZSA: fetchToys - Action finished with error."); // Logg 14: Action klar (error)
    } */




/*
const useToyStore = create((set, get) => ({
  toys: [], // Array för att hålla leksaks-objekt
  isLoading: true, // Boolean för laddningsstatus
  error: null, // Null eller ett fel-objekt/meddelande

  // Funktioner för att uppdatera storen
  setToys: (toys) => set({ toys }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addToCart: (toyToAdd) => set((state) => {
    // Kontrollera om leksaken redan finns i varukorgen
    const existingItem = state.cart.find(item => item.id === toyToAdd.id);
    if (existingItem) {
      // Öka antalet om den redan finns
      return {
        cart: state.cart.map(item =>
          item.id === toyToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    } else {
      // Lägg till som ny post med kvantitet 1
      return {
        cart: [...state.cart, { ...toyToAdd, quantity: 1 }]
      };
    }
  }),

  // <-- Ny funktion för att sätta vald leksak (om du behöver detta)
  setSelectedToy: (toy) => set({ selectedToy: toy }),

  // Lägg till funktioner för att ta bort från varukorg, minska antal, etc. om du behöver
}));

//}));

export { useToyStore }; */
