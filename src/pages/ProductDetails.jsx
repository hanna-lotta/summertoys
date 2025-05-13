import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './ProductDetails.css';
//import { useProductStore } from "../data/ProductsStore";
import { Link } from "react-router";
import { useToyStore } from "../data/toyStore";
import { useCartStore } from "../data/cartStore";
import { shallow } from "zustand/shallow"; // <-- Importera shallow för säkra selektorer
import { db } from "../data/database";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
	const { id } = useParams(); // Hämta ID från URL:en
   
	const selectedToy = useToyStore(state => state.selectedToy); // Hämta den valda leksaken från Zustand
	const setSelectedToy = useToyStore(state => state.setSelectedToy); // Hämta setSelectedToy actionen
	const isLoading = useToyStore(state => state.isLoading); // Hämta isLoading från Zustand
	const error = useToyStore(state => state.error); // Hämta error från Zustand
	const fetchToyById = useToyStore(state => state.fetchToyById); // Hämta fetchToyById actionen
	const addToCart = useCartStore(state => state.addToCart); // Hämta addToCart actionen
	

// Hämta produktdetaljer om de inte redan finns i Zustand-storen
useEffect(() => {
    if (!selectedToy || selectedToy.id !== id) {
      fetchToyById(id); // Hämta produktdetaljer från Firestore
    }
  }, [id, selectedToy, fetchToyById]);

  // Visa laddningsindikator om data hämtas
  if (isLoading) {
    return <div>Laddar produktdetaljer...</div>;
  }

  // Visa felmeddelande om något gick fel
  if (error) {
    return (
      <div>
        <p>Ett fel uppstod: {error}</p>
        <Link to="/products" className="page-buttons">Tillbaka till listan</Link>
      </div>
    );
  }

  // Visa meddelande om produkten inte hittades
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
      <h1>{selectedToy.title}</h1> 
      <img src={selectedToy.img} alt={`Bild på ${selectedToy.title}`} />

      <p>Pris: {selectedToy.price} kr</p>
      {/* Anta att beskrivningen finns som fält i Firestore */}
      <p>Beskrivning: {selectedToy.description || 'Ingen beskrivning tillgänglig.'}</p>

      {/* Använd addToCart funktionen HÄMTAD FRÅN useToyStore */}
      {/* Skicka det aktuella selectedToy objektet till addToCart */}
      <button onClick={() => addToCart(selectedToy)} className="order-button">Lägg till i varukorg</button>

      <Link to="/products" className="page-buttons">Tillbaka till listan</Link>
    </div>
  );
};

export default ProductDetails;

	