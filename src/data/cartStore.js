import { create } from "zustand";
/*
const useCartStore = create((set) => ({
  cart: [],  // tom varukorg

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
}));
//	export { useCartStore }; */
import { ProductsList } from "./ProductsStore";

const addToCart = (id) => {
	// Logic to add the product to the cart
	const product = ProductsList.find(item => item.id === id);
	if (!product) {
	  console.error(`Product with id ${id} not found`);
	  return;
	}
	console.log(`Product with id ${id} added to cart`);
  }

  export { addToCart }