import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useProductStore } from "../data/ProductsStore";
import { Link } from "react-router";

const ProductDetails = () => {
  const selectedProduct = useProductStore((state) => state.selectedProduct);

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
      <Link to="/products" className="page-buttons">Tillbaka</Link>
    </div>
  );
};



/*
const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`https://fakestoreapi.com/products/${id}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="product-details">
			<h1>{product.title}</h1>
			<img src={product.image} alt={product.title} />
			<p>{product.description}</p>
			<p>Price: ${product.price}</p>
		</div>
	);
}*/
export default ProductDetails;