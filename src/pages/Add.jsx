import Joi from 'joi';
import './Add.css';
import { useToyStore } from '../data/toyStore.js';
import { useState } from 'react';
import { validateForm } from '../data/Validation.js';
import { useNavigate } from 'react-router';


const Add = () => {
	const addToy = useToyStore(state => state.addToy); 
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		price: '',
		img: '',
	  });
	  const [touched, setTouched] = useState({});
	  const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prevTouched) => ({
		  ...prevTouched,
		  [name]: true,
		}));
	  };
	  const {message, css, formIsValid} = validateForm(formData, touched);
	  const [errors, setErrors] = useState({});
	  const navigate = useNavigate();
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };


		const submitForm = async (e) => {
			e.preventDefault();
			if (formIsValid) {
		try {
			await addToy(formData);
			alert('Produkten har lagts till!');
			setFormData({ title: '', description: '', price: '', img: '' }); // Återställ formuläret
			navigate("/products"); // Navigera tillbaka till produktsidan
		  } catch (err) {
			console.error('Ett fel uppstod vid tillägg av produkt:', err);
		  }
		  	} else {
				alert('Fyll i alla fält korrekt innan du skickar in formuläret.');
			
			}
		}

	return (
		<div className="add-product">
			<h1>Lägg till produkt</h1>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="title">Titel:</label>
					<input 
					className={css.title} 
					type="text" 
					id="title"
					name="title" 
					value={formData.title}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Skriv produktnamn här"
					required />
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
					value={formData.img}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Skriv bildlänk här"
					//pattern="https?://.+\.(jpg|jpeg|png|gif)$"
					required />
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
					rows="5"
					value={formData.description}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Skriv produktbeskrivning här"
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
					value={formData.price}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Skriv produktpris här"
					required 
					/>
					
					<div>
						{touched.price && message.price && (
					<p className='error-message'>{message.price}</p>
						)}
					</div>
				</div>
				<div>
					<button type="submit"
					disabled={!formIsValid}
					onClick={submitForm}
					>Lägg till produkt</button>
				</div>
			</form>
		</div>
	);
	
}
export default Add;