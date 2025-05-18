import { Link } from "react-router"
import './Cart.css'
import { useCartStore } from "../data/cartStore";




  const Cart = () => {
	
	// Använd shallow eftersom vi selekterar flera värden, inklusive en array (cart)
	const cart = useCartStore(state => state.cart);
	const addToCart = useCartStore(state => state.addToCart);
	const removeFromCart = useCartStore(state => state.removeFromCart);
	const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
	const getTotalPrice = useCartStore(state => state.getTotalPrice);
	const clearCart = useCartStore(state => state.clearCart);
	const getCartCount = useCartStore(state => state.getCartCount);
	const getItemQuantity = useCartStore(state => state.getItemQuantity);
	

 	const totalPrice = getTotalPrice();
  
  
	console.log("Cart:", cart); 
	console.log("Total Price:", totalPrice); 
  
  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p>Kundvagnen är tom.</p>
      ) : (
		<div className="cart-items-list">
        {cart.map((item) => (
          <div className="cart-items" key={item.id}>
			<div className="cart-item-info">
            <h2>{item.title}</h2>
            <p className="price">{item.price} kr</p>
			<p>Antal: {item.quantity}</p>
			</div>
			<div className="quantity-buttons">
			<button className="minus-button"
			onClick={() => decreaseQuantity(item.id)} 
			>-</button>
			<button className="plus-button" 
			onClick={() => addToCart(item)} 
			>+</button>
			</div>
            <button
              className="page-buttons"
              onClick={() => removeFromCart(item.id)} 
            >
              Ta bort
            </button>
          </div>
        ))}
		</div>
      )}
	  <div className="cart-summary">
	  <h3>Totalt pris: {totalPrice} kr</h3>
	  <Link to="/checkout" className="page-buttons"
	  onClick={clearCart}
	  >Betala</Link>
      <Link to="/products" className="page-buttons">Tillbaka</Link>
	  </div>
    </div>
  );

}
export default Cart