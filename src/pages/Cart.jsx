import { Link } from "react-router"
import { ProductsList } from "../data/ProductsStore"
import { useProductStore } from "../data/ProductsStore";
import './Cart.css'


const Cart = () => {
	const cart = useProductStore((state) => state.cart);
	const addToCart = useProductStore((state) => state.addToCart); // Importera addToCart
	const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  


  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p>Kundvagnen är tom.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-items" key={item.id}>
            <h2>{item.title}</h2>
            <p className="price">{item.price} kr</p>
            <button
              className="page-buttons"
              onClick={() => removeFromCart(item.id)} // Ta bort från kundvagn
            >
              Ta bort
            </button>
          </div>
        ))
      )}
      <Link to="/products" className="page-buttons">Tillbaka</Link>
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