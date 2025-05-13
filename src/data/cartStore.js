import { create } from "zustand";
import { addToCart, removeFromCart,decreaseQuantity, calculateTotalPrice, getCartCount, getCartItemCountById } from "../data/cartService.js"; 
	

const useCartStore = create((set, get) => ({
  cart: [],  
// 'get' behövs för funktioner som läser state, t.ex. getCartCount/getTotalPrice
  // --- Vald produkt/leksak för detaljvy ---
  selectedToy: null, // State för den leksak som är vald för detaljvy

  // Funktion för att sätta den valda leksaken
  setSelectedToy: (toy) => set({ selectedToy: toy }),

  addToCart: (toyToAdd) =>
    set((state) => ({
      cart: addToCart(state.cart, toyToAdd),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: removeFromCart(state.cart, id),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: decreaseQuantity(state.cart, id),
    })),

  getTotalPrice: () => calculateTotalPrice(get().cart),

  clearCart: () => set({ cart: [] }),

  getCartCount: () => getCartCount(get().cart),
  
  getItemQuantity: (id) => getCartItemCountById(get().cart, id),
 
}));
export { useCartStore }; 

/*
  // Lägg till varor i varukorgen
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Om varan finns, öka antalet
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        // Om produkten inte finns, lägg till den
        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }
    }),
}));*/

//import { ProductsList } from "./ProductsStore";

/*
const useProductStore = create((set) => ({
	selectedProduct: null,
	setSelectedProduct: (product) => set({ selectedProduct: product }),
  
	cart: [], // Kundvagn
	addToCart: (product) =>
	  set((state) => ({
		cart: [...state.cart, product],
	  })),
	removeFromCart: (id) =>
	  set((state) => ({
		cart: state.cart.filter((item) => item.id !== id),
	  })),
	clearCart: () => set({ cart: [] }),
  
	// Lägg till i Zustand-store
   getCartTotal: (state) =>
	  state.cart.reduce((total, item) => total + item.price, 0),
  }));
/*
const addToCart = (id) => {
	// Logic to add the product to the cart
	const product = ProductsList.find(item => item.id === id);
	if (!product) {
	  console.error(`Product with id ${id} not found`);
	  return;
	}
	console.log(`Product with id ${id} added to cart`);
  }*/

  //export { addToCart }

//export { useProductStore }; 