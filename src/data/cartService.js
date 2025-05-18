


  export const addToCart = (cart, toyToAdd) => {
	const existingItem = cart.find((item) => item.id === toyToAdd.id);
	if (existingItem) {
	  return cart.map((item) =>
		item.id === toyToAdd.id
		  ? { ...item, quantity: item.quantity + 1 }
		  : item
	  );
	}
	return [...cart, { ...toyToAdd, quantity: 1, price: toyToAdd.price || 0 }];
  };
  
  export const removeFromCart = (cart, id) => {
	return cart.filter((item) => item.id !== id);
  };
  
  export const decreaseQuantity = (cart, id) => {
	return cart.map((item) => {
	  if (item.id !== id) return item;
	  if (item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
	  return { ...item, quantity: 1 }; 
	}).filter(item => item.quantity > 0);
  };

  
  export const calculateTotalPrice = (cart) => {
	return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
	  export const clearCart = () => {
	return [];
	  }
	    
export const getCartCount = (cart) => {
	return cart.reduce((total, item) => total + (item.quantity || 0), 0);	
  };
 
export const getCartItemCountById = (cart, id) => {
	const item = cart.find((item) => item.id === id);
	return item?.quantity || 0;
  };


