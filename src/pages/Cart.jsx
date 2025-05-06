import { Link } from "react-router"
import { ProductsList } from "../data/ProductsStore"
import { useProductStore } from "../data/ProductsStore";
import './Cart.css'


const Cart = () => {
	const cart = useProductStore((state) => state.cart);
	const addToCart = useProductStore((state) => state.addToCart); 
	const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const decreaseQuantity = useProductStore((state) => state.decreaseQuantity);
  const getTotalPrice = useProductStore((state) => state.getTotalPrice);

  const totalPrice = getTotalPrice();

  console.log("Cart:", cart);
  console.log("Total Price:", totalPrice);
  


  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p>Kundvagnen är tom.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-items" key={item.id}>
            <h2>{item.title}</h2>
            <p className="price">{item.price} kr</p>
			<p>Antal: {item.quantity}</p>
			<div>
			<button className="plus-button" 
			onClick={() => addToCart(item)} // Öka antal
			>+</button>
			<button className="minus-button"
			onClick={() => decreaseQuantity(item.id)} // Minska antal
			>-</button>
			</div>
            <button
              className="page-buttons"
              onClick={() => removeFromCart(item.id)} // Ta bort från kundvagn
            >
              Ta bort
            </button>
          </div>
        ))
      )}
	  <div className="cart-summary">
	  <h3>Totalt pris: {totalPrice} kr</h3>
      <Link to="/products" className="page-buttons">Tillbaka</Link>
	  <Link to="/checkout" className="page-buttons">Betala</Link>
	  </div>
    </div>
  );

  /*
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
  )*/
}
export default Cart