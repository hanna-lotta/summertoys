import { Link, NavLink, useNavigate } from "react-router";
import './Products.css';	
import React, { useEffect } from 'react';
import { useToyStore } from '../data/toyStore.js'; 
import { useCartStore } from '../data/cartStore.js'; 
import {useLogInStore} from '../data/LoginStore';



const ToyList = () => {
	  const toys = useToyStore(state => state.toys);
	  const isLoading = useToyStore(state => state.isLoading);
	  const error = useToyStore(state => state.error);
	  const fetchToys = useToyStore(state => state.fetchToys); 
  	  const setSelectedToy = useToyStore(state => state.setSelectedToy); 
	  const removeToy = useToyStore(state => state.removeToy);
	  const isAdmin = useLogInStore(state => state.isLoggedIn); // Kontrollera om användaren är admin
	  const navigate = useNavigate();
	const addToCart = useCartStore(state => state.addToCart); // Hämta addToCart actionen

	const handleAdd = () => {
		navigate('/add'); // Navigera till Add-sidan
	  };
	const handleEdit = (id) => {
		navigate(`/edit/${id}`); // Navigera till Edit-sidan med leksakens ID
	  }
	
/*
	const getCartCount = useCartStore(state => state.cart.length); // Hämta antalet produkter i kundvagnen
	const cart = useCartStore(state => state.cart); // Hämta kundvagnen
	const getItemQuantity = useCartStore(state => state.getItemQuantity);*/
  
	useEffect(() => {
	  fetchToys();
	}, []);

  if (isLoading) {
    return <div>Laddar leksaker...</div>;
  }

  if (error) {
  	return <div>Ett fel uppstod: {error}</div>;
  }


return (
	<div className="products">
		<div className="search">
			<label htmlFor="search">Sök efter produkter:</label>
			<input type="text" id="search" placeholder="Sök..." />
		</div>
		{isAdmin && (
        <button onClick={handleAdd} className="add-button">
          Lägg till produkt
        </button>
      )}
		<div className="products-container">
  			{toys.map((toy) => (
	  <div className="card" key={toy.id}>
		<h2>{toy.title}</h2>
		<img src={toy.img} alt={`img-${toy.title}`} />
		<p className="price">{toy.price} kr</p>
		<Link to={`/products/${toy.id}`} className="details-link"
		onClick={() => setSelectedToy(toy)} // Sätt vald produkt
		>Läs mer om produkten här</Link>
		<button onClick={() => addToCart(toy)} className="order-button">Lägg till i varukorg</button>
		<Link to={'/cart'} className="page-buttons">Betala</Link>
		{isAdmin && (
              <div className="admin-buttons">
                <button onClick={() => handleEdit(toy.id)}>Ändra</button>
                <button onClick={() => removeToy(toy.id)}>Ta bort</button>
              </div>
			)}  	
	  </div>
	))}
  </div>
</div>
);
}


export default ToyList;

