import Joi from 'joi';
import './Login.css';
import { validateForm } from '../data/Validation';
//import { useToyStore } from '../data/toyStore.js';
import { useLogInStore } from '../data/LoginStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const schema = Joi.object({

	username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

	password: Joi.string()
		.pattern(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
	
});

const Login = () => {
	const loginAsAdmin = useLogInStore((state) => state.loginAsAdmin);
	const logout = useLogInStore((state) => state.logout);
	const isLoggedIn = useLogInStore((state) => state.isLoggedIn);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({ username: '', password: 'leka' });
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
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

		loginAsAdmin(); 
		navigate("/products"); 
	};
	//TODO?
	//const { message, formIsValid } = validateForm();

	return (
		<div className="login">
			<h1>Logga in</h1>
			{isLoggedIn && <p>Du är inloggad</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Användarnamn:</label>
					<input 
					type="text" 
					id="username" 
					name="username" 
					value={formData.username}
					onChange={handleChange}
					placeholder="Skriv användarnamn här"
					required 
					/>
					{errors.username && <p className="error-message">{errors.username}</p>}
					{/*
					<div>
						<p className="error-message">Användarnamn måste vara mellan 3 och 20 tecken långt och får endast innehålla bokstäver och siffror.</p>
					</div>*/}
				</div>
				<div>
					<label htmlFor="password">Lösenord:</label>
					<input 
					type="password" 
					id="password" 
					name="password" 
					value={formData.password}
					onChange={handleChange}
					placeholder="Skriv lösenord här"
					required 
					/>
					{errors.password && <p className="error-message">{errors.password}</p>}
				{/*
				<div>
					<p className="error-message">Lösenordet måste vara mellan 3 och 30 tecken långt och får endast innehålla bokstäver och siffror.</p>
				</div>*/}
				</div>
				<button type="submit">Logga in</button>
			</form>
			{isLoggedIn && (
				<button onClick={logout} className="logout-button">
					Logga ut
				</button>
			)}
		</div>
	);
}
export default Login;