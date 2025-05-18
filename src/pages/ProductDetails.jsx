import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './ProductDetails.css';
import { Link } from "react-router";
import { useToyStore } from "../data/toyStore";
import { useCartStore } from "../data/cartStore";


const ProductDetails = () => {
	const { id } = useParams(); 
   
	const selectedToy = useToyStore(state => state.selectedToy); 
	const setSelectedToy = useToyStore(state => state.setSelectedToy); 
	const isLoading = useToyStore(state => state.isLoading); 
	const error = useToyStore(state => state.error); 
	const fetchToyById = useToyStore(state => state.fetchToyById); 
	const addToCart = useCartStore(state => state.addToCart); 
	


useEffect(() => {
    if (!selectedToy || selectedToy.id !== id) {
      fetchToyById(id); 
    }
  }, [id, selectedToy, fetchToyById]);

  
  if (isLoading) {
    return <div>Laddar produktdetaljer...</div>;
  }

  
  if (error) {
    return (
      <div>
        <p>Ett fel uppstod: {error}</p>
        <Link to="/products" className="page-buttons">Tillbaka till listan</Link>
      </div>
    );
  }

  
  if (!selectedToy) {
    return (
      <div>
        <p>Produkten kunde inte hittas.</p>
        <Link to="/products" className="page-buttons">Tillbaka till listan</Link>
      </div>
    );
  }
  
  return (
    <div className="product-details">
      <h1 className="title-selected">{selectedToy.title}</h1> 
      <img className="img-selected" src={selectedToy.img} alt={`Bild på ${selectedToy.title}`} />
      <p className="price-selected">Pris: {selectedToy.price} kr</p>
      <p className="description-selected">Beskrivning: {selectedToy.description || 'Ingen beskrivning tillgänglig.'}</p>
      <button onClick={() => addToCart(selectedToy)} className="order-button">Lägg till</button>

      <Link to="/products" className="page-buttons">Tillbaka</Link>
    </div>
  );
};

export default ProductDetails;

	