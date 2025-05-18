import { create } from "zustand";
import { addToCart, removeFromCart,decreaseQuantity, calculateTotalPrice, getCartCount, getCartItemCountById } from "../data/cartService.js"; 
	

const useCartStore = create((set, get) => ({
  cart: [],  
  selectedToy: null, 

  
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


const useProductStore = create((set) => ({
	selectedProduct: null,
	setSelectedProduct: (product) => set({ selectedProduct: product }),
  
	cart: [], 
	addToCart: (product) =>
	  set((state) => ({
		cart: [...state.cart, product],
	  })),
	removeFromCart: (id) =>
	  set((state) => ({
		cart: state.cart.filter((item) => item.id !== id),
	  })),
	clearCart: () => set({ cart: [] }),
  
	
   getCartTotal: (state) =>
	  state.cart.reduce((total, item) => total + item.price, 0),
  }));
