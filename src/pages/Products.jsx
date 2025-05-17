import { Link, NavLink, useNavigate } from "react-router";
import './Products.css';	
import React, { useEffect } from 'react';
import { useToyStore } from '../data/toyStore.js'; 
import { useCartStore } from '../data/cartStore.js'; 
import {useLogInStore} from '../data/LoginStore';
import { useState } from "react";



const ToyList = () => {
	  const toys = useToyStore(state => state.toys);
	  const isLoading = useToyStore(state => state.isLoading);
	  const error = useToyStore(state => state.error);
	  const fetchToys = useToyStore(state => state.fetchToys); 
  	  const setSelectedToy = useToyStore(state => state.setSelectedToy); 
	  const removeToy = useToyStore(state => state.removeToy);
	  const isAdmin = useLogInStore(state => state.isLoggedIn); 
	  const navigate = useNavigate();
	const addToCart = useCartStore(state => state.addToCart); 

	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState(''); 

	const handleAdd = () => {
		navigate('/add'); 
	  };
	const handleEdit = (id) => {
		navigate(`/edit/${id}`); 
	  }
	
  
	useEffect(() => {
	  fetchToys();
	}, []);

  if (isLoading) {
    return <div>Laddar leksaker...</div>;
  }

  if (error) {
  	return <div>Ett fel uppstod: {error}</div>;
  }

    // Filtrera leksaker baserat på sökfrågan
	const filteredToys = toys.filter((toy) =>
		toy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		toy.description.toLowerCase().includes(searchQuery.toLowerCase())
	  );

	  // Sortera leksaker baserat på sorteringsalternativ
  const sortedToys = [...filteredToys].sort((a, b) => {
    if (sortOption === 'name-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'name-desc') {
      return b.title.localeCompare(a.title);
    } else if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });



return (
	<div className="products">
		<div className="search">
			<label htmlFor="search">Sök efter produkter:</label>
			<input 
			type="text" 
			id="search" 
			placeholder="Sök..." 
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
		<div className="sort">
        <label htmlFor="sort">Sortera efter:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Ingen sortering</option>
          <option value="name-asc">Namn (A-Ö)</option>
          <option value="name-desc">Namn (Ö-A)</option>
          <option value="price-asc">Pris (Lägst först)</option>
          <option value="price-desc">Pris (Högst först)</option>
        </select>
      </div>
		{isAdmin && (
        <button onClick={handleAdd} className="add-button">
          Lägg till produkt
        </button>
      )}
		<div className="products-container">
  			{sortedToys.map((toy) => (
	  <div className="card" key={toy.id}>
		<h2 className="card-title">{toy.title}</h2>
		<img className="card-img" src={toy.img} alt={`img-${toy.title}`} />
		<p className="price">{toy.price} kr</p>
		<Link to={`/products/${toy.id}`} className="details-link"
		onClick={() => setSelectedToy(toy)} // Sätt vald produkt
		>Läs mer</Link>
		<div className="page-buttons-container">
		<button onClick={() => addToCart(toy)} className="page-buttons">Lägg till</button>
		<Link to={'/cart'} className="page-buttons">Betala</Link>
		</div>
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

