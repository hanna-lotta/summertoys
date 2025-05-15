import Joi from 'joi';
import './Add.css';
import { useToyStore } from '../data/toyStore.js';
import { useState } from 'react';
import { validateForm } from '../data/Validation.js';
import { useNavigate } from 'react-router';


const schema = Joi.object({

	title: Joi.string()
		.min(1)
		.required(),
	description: Joi.string()
		.min(10)
		.required(),
	price: Joi.number()
		.positive()
		.required(),

	img: Joi.string()
		.pattern(/^https?:\/\/.+/i)
    	.pattern(/\.(jpeg|jpg|gif|png|webp|svg)$/i)
		.required(),
	
});

const Add = () => {
	const addToy = useToyStore(state => state.addToy); 
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		price: '',
		img: '',
	  });
	  const [errors, setErrors] = useState({});
	  const navigate = useNavigate();
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };
	  const handleSubmit = async (e) => {
		e.preventDefault();
		navigate("/products"); // Navigera tillbaka till produktsidan
	
		// Validera formulärdata med Joi
		const { error } = schema.validate(formData, { abortEarly: false });
		if (error) {
		  const validationErrors = {};
		  error.details.forEach((detail) => {
			validationErrors[detail.path[0]] = detail.message;
		  });
		  setErrors(validationErrors);
		  return;
		}
	
		setErrors({}); // Rensa eventuella tidigare fel

		// Lägg till leksaken i Firestore
		try {
			await addToy(formData);
			alert('Produkten har lagts till!');
			setFormData({ name: '', description: '', price: '', img: '' }); // Återställ formuläret
		  } catch (err) {
			console.error('Ett fel uppstod vid tillägg av produkt:', err);
		  }
		};

	return (
		<div className="add-product">
			<h1>Lägg till produkt</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Titel:</label>
					<input 
					type="text" 
					id="title"
					name="title" 
					value={formData.name}
					onChange={handleChange}
					placeholder="Skriv produktnamn här"
					required />
					{/*<div>
					<p className='error-message'>Namn måste vara mellan 3 och 30 tecken långt och får endast innehålla bokstäver och siffror.</p>
					</div>*/}
					{errors.name && <p className='error-message'>{errors.name}</p>}
				</div>
				<div>
					<label htmlFor="img">Bild:</label>
					<input type="text" 
					id="img" 
					name="img" 
					value={formData.img}
					onChange={handleChange}
					placeholder="Skriv bildlänk här"
					//pattern="https?://.+\.(jpg|jpeg|png|gif)$"
					required />
					{/*<div>
					<p className='error-message'>URL måste vara en giltig bildlänk.</p>
					</div>*/}
					{errors.img && <p className='error-message'>{errors.img}</p>}
				</div>
				<div>
					<label htmlFor="description">Beskrivning:</label>
					<textarea 
					id="description" 
					name="description" 
					value={formData.description}
					onChange={handleChange}
					placeholder="Skriv produktbeskrivning här"
					//pattern="^[a-zA-Z0-9]{3,30}$"
					//minLength="3"
					//maxLength="30"
					required
					></textarea>
					{/*
					<div>
					<p className='error-message'>Beskrivning måste vara mellan 3 och 30 tecken långt och får endast innehålla bokstäver och siffror.</p>
					</div>*/}
					{errors.description && <p className='error-message'>{errors.description}</p>}
				</div>
				<div>
					<label htmlFor="price">Pris:</label>
					<input 
					type="number" 
					id="price" 
					name="price" 
					value={formData.price}
					onChange={handleChange}
					placeholder="Skriv produktpris här"
					//pattern="^[0-9]+$"
					//min="1"
					//max="10000"
					required 
					/>
					{/*
					<div>
					<p className='error-message'>Priset måste vara ett positivt heltal.</p>
					</div>*/}
					{errors.price && <p className='error-message'>{errors.price}</p>}
				</div>
				<div>
					<button type="submit">Lägg till produkt</button>
				</div>
			</form>
		</div>
	);
}
export default Add;