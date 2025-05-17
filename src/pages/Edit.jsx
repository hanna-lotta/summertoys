import './Edit.css';
import { addDoc, deleteDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../data/database"; // Importera din Firestore-instans
import { validateForm } from '../data/Validation';
import React, { useState, useEffect } from "react";
import { useToyStore } from "../data/toyStore";
import { useParams, useNavigate } from "react-router";


const Edit = () => {
	/*const [formData, setFormData] = useState({
	title: '',
	description: '',
	price: '',
	img: '',
	});*/
	const [toy, setToy] = useState(null);
	const [touched, setTouched] = useState({});
	
	
	
	const {message, css, formIsValid} = validateForm(toy || {}, touched);
	const [errors, setErrors] = useState({});
	
	
	const { id } = useParams(); // Hämta leksakens ID från URL:en
	const navigate = useNavigate();
	
	const toys = useToyStore((state) => state.toys); // Hämta den valda leksaken från Zustand
	const updateToy = useToyStore((state) => state.updateToy); // Hämta updateToy-funktionen från Zustand
	
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
			[name]: name === "price" ? Number(value) : value,
			
		}));
	};
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setTouched({
			title: true,
			description: true,
			price: true,
			img: true,
		});
		if (formIsValid) {
			try {
				await updateToy(toy); // Uppdatera leksaken i Firestore och Zustand
				navigate("/products"); // Navigera tillbaka till produktsidan
			} catch (err) {
				console.error('Ett fel uppstod vid ändring av produkt:', err);
			}
		} else {
			alert('Fyll i alla fält korrekt innan du skickar in formuläret.');
			
		}
	};
	
	if (!toy) return <div>Laddar...</div>; 
	console.log("toy:", toy, "formIsValid:", formIsValid, "message:", message);
	return (
		<div className='edit'>
		<h1>Ändra</h1>
		<form onSubmit={handleSubmit}>
		<div>
		<label htmlFor="title">Titel:</label>
		<input
		className={css.title} 
		type="text"
		id="title"
		name="title"
		value={toy.title}
		onChange={handleChange}
		onBlur={() => setTouched(t => ({ ...t, title: true }))}
		required
		/>
		<div>
		{touched.title && message.title && (
			<p className='error-message'>{message.title}</p>
		)}
		</div>
		</div>
		<div>
		<label htmlFor="img">Bild:</label>
		<input
		className={css.img}
		type="text"
		id="img"
		name="img"
		value={toy.img}
		onChange={handleChange}
		onBlur={() => setTouched(t => ({ ...t, img: true }))}
		required
		/>
		<div>
		{touched.img && message.img && (
			<p className='error-message'>{message.img}</p>
		)}
		</div>
		</div>
		<div>
		<label htmlFor="description">Beskrivning:</label>
		<textarea
		className={css.description}
		id="description"
		name="description"
		value={toy.description}
		onChange={handleChange}
		onBlur={() => setTouched(t => ({ ...t, description: true }))}
		required
		></textarea>
		<div>
		{touched.description && message.description && (
			<p className='error-message'>{message.description}</p>
		)}
		</div>
		</div>
		<div>
		<label htmlFor="price">Pris:</label>
		<input
		className={css.price}
		type="number"
		id="price"
		name="price"
		value={toy.price}
		onChange={handleChange}
		onBlur={() => setTouched(t => ({ ...t, price: true }))}
		required
		/>
		<div>
		{touched.price && message.price && (
			<p className='error-message'>{message.price}</p>
		)}
		</div>
		</div>
		<button type="submit"
		disabled={!formIsValid}
		
		>Uppdatera</button>
		</form>
		</div>
	); 
};

export default Edit;
