import { Link } from "react-router"
import { ProductsList } from "../data/ProductsStore"
import './Cart.css'
/*
const addToCart = (id) => {
  // Logic to add the product to the cart
  const product = ProductsList.find(item => item.id === id);
  if (!product) {
	console.error(`Product with id ${id} not found`);
	return;
  }
  console.log(`Product with id ${id} added to cart`);
}
const removeFromCart = (id) => {
  // Logic to remove the product from the cart
  console.log(`Product with id ${id} removed from cart`);
}
const clearCart = () => {
  // Logic to clear the cart
  console.log('Cart cleared');
}
const checkout = () => {
  // Logic to proceed to checkout
  console.log('Proceeding to checkout');
}
const getCartItems = () => {
  // Logic to get the items in the cart
  return ProductsList; // Replace with actual cart items
}
const getCartCount = () => {
  // Logic to get the number of items in the cart
  return ProductsList.length; // Replace with actual cart count
}
const getCartTotal = () => {
  // Logic to get the total price of items in the cart
  return ProductsList.reduce((total, item) => total + item.price, 0); // Replace with actual cart total
}
*/

const Cart = () => {
  return (
	<div className="cart-container">
	  {ProductsList.map((item) => (
		  <div className="cart-items" key={item.id}>
			<h2>{item.title}</h2>
			<p className="price">{item.price} kr</p>
			<Link to={'/products'} className="page-buttons">Tillbaka</Link>
			<button className="page-buttons">Betala</button>
		  </div>
		))}
	  </div>
  )
}
export default Cart