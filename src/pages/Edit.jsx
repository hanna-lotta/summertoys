import './Edit.css';
import { addDoc, deleteDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../data/database"; // Importera din Firestore-instans
import { validateForm } from '../data/Validation';
import React, { useState, useEffect } from "react";
import { useToyStore } from "../data/toyStore";
import { useParams, useNavigate } from "react-router";


const Edit = () => {
	
	const { message, formIsValid } = validateForm();

  const { id } = useParams(); // Hämta leksakens ID från URL:en
  const navigate = useNavigate();

 const toys = useToyStore((state) => state.toys); // Hämta den valda leksaken från Zustand
 const updateToy = useToyStore((state) => state.updateToy); // Hämta updateToy-funktionen från Zustand

  const [toy, setToy] = useState(null);

  console.log("toys:", toys);
  console.log("updateToy:", updateToy);
  

  useEffect(() => {
    const toyToEdit = toys.find((t) => t.id === id);
    if (toyToEdit) {
      setToy(toyToEdit);
    }
  }, [id, toys]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToy((prevToy) => ({
      ...prevToy,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateToy(toy); // Uppdatera leksaken i Firestore och Zustand
    navigate("/products"); // Navigera tillbaka till produktsidan
  };

  if (!toy) return <div>Laddar...</div>; 

  return (
    <div className='edit'>
      <h1>Edit Toy</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={toy.title}
            onChange={handleChange}
            required
          />
        </div>
		<div>
		  <label htmlFor="img">Image URL:</label>
		  <input
			type="text"
			id="img"
			name="img"
			value={toy.img}
			onChange={handleChange}
			required
		  />
		</div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={toy.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={toy.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Toy</button>
      </form>
    </div>
  ); 
};

export default Edit;
