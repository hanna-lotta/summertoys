import { Link, NavLink } from "react-router";
import { ProductsList } from "../data/ProductsStore";
import { useProductStore } from "../data/ProductsStore";
import './Products.css';	
import { useState } from "react";

//import { addToCart } from "../data/cartStore";


const Products = () => {
	const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
	const addToCart = useProductStore((state) => state.addToCart);
/*
	if (!selectedProduct) {
		return (
		  <div>
			<p>Ingen produkt vald.</p>
			<Link to="/products" className="page-buttons">Tillbaka</Link>
		  </div>
		);
	  }
	
	  return (
		<div className="product-details">
		  <h1>{selectedProduct.title}</h1>
		  <img src={selectedProduct.img} alt={`img-${selectedProduct.title}`} />
		  <p>Pris: {selectedProduct.price} kr</p>
		  <p>Beskrivning: {selectedProduct.description}</p>
		  <button onClick={() => addToCart(selectedProduct)} className="order-button">Lägg till i varukorg</button>
		  <Link to="/products" className="page-buttons">Tillbaka</Link>
		</div>
	  );
	};*/


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
			
			<p className="price">{item.price} kr</p>
			<Link to={`/products/:id'${item.id}`} className="details-link"
			onClick={() => setSelectedProduct(item)} // Sätt vald produkt
			>Läs mer om produkten här</Link>
			<button onClick={() => addToCart(item)} className="order-button">Lägg till i varukorg</button>
			<Link to={'/cart'} className="page-buttons">Betala</Link>
		  </div>
		))}
	  </div>
	</div>
	);
}
export default Products;