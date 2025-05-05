import { Link, NavLink } from "react-router";
import { ProductsList, useProductStore } from "../data/ProductsStore";
import './Products.css';	
import { useState } from "react";

import { addToCart } from "../data/cartStore";


const Products = () => {
	const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

	// const [products, setProducts] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);
	// const [cart, setCart] = useState([]);
	// const [cartCount, setCartCount] = useState(0);
	// const [cartTotal, setCartTotal] = useState(0);
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const [user, setUser] = useState(null);
	// const [isAdmin, setIsAdmin] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);
	// const [isError, setIsError] = useState(false);
	// const [isSuccess, setIsSuccess] = useState(false);
	// const [isEditMode, setIsEditMode] = useState(false);
	// const [isAddMode, setIsAddMode] = useState(false);
	// const [isDeleteMode, setIsDeleteMode] = useState(false);
	// const [isCheckoutMode, setIsCheckoutMode] = useState(false);
	// const [isLoginMode, setIsLoginMode] = useState(false);
	// const [isLogoutMode, setIsLogoutMode] = useState(false);
	// const [isRegisterMode, setIsRegisterMode] = useState(false);

	return (
		<div className="products">
			<div className="search">
				<label htmlFor="search">Sök efter produkter:</label>
				<input type="text" id="search" placeholder="Sök..." />
			</div>
			<div className="products-container">
	  {ProductsList.map((item) => (
		  <div className="card" key={item.id}>
			<h2>{item.title}</h2>
			<img src={item.img} alt={`img-${item.title}`} />
			<p>{item.description}</p>
			<p className="price">{item.price} kr</p>
			<Link to={`/products/:id'${item.id}`} className="details-link"
			onClick={() => setSelectedProduct(item)} // Sätt vald produkt
			>Läs mer om produkten här</Link>
			<button onClick={() => addToCart(item.id)} className="order-button">Lägg till i varukorg</button>
			<Link to={'/cart'} className="page-buttons">Betala</Link>
		  </div>
		))}
	  </div>
	</div>
	);
}
export default Products;