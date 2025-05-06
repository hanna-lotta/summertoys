import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './ProductDetails.css';
import { useProductStore } from "../data/ProductsStore";
import { Link } from "react-router";

const ProductDetails = () => {
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const addToCart = useProductStore((state) => state.addToCart);


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
};

export default ProductDetails;