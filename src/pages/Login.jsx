import Joi from 'joi';
import './Login.css';
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
	
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({username: false, password: false});
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		// Ta bort felmeddelande om fältet blir rätt
		setErrors((prev) => ({
			...prev,
			[name]: "",
		}));
	};
	
	
	const handleBlur = (e) => {
		const { name, value } = e.target;
		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));
		if (name === "username") {
			if (value !== "admin") {
				setErrors((prev) => ({
					...prev,
					username: "Fel användarnamn",
				}));
				return;
			}
		}
		
		if (name === "password") {
			if (value !== "password") {
				setErrors((prev) => ({
					...prev,
					password: "Fel lösenord",
				}));
				return;
			}
		}
	};
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const { error } = schema.validate(formData, { abortEarly: false });
		if (error) {
			const validationErrors = {};
			error.details.forEach((detail) => {
				const key = detail.path[0];
				if (key === "username") {
					validationErrors[key] = "Fel användarnamn";
				} else if (key === "password") {
					validationErrors[key] = "Fel lösenord";
				} else {
					validationErrors[key] = detail.message; // fallback
				}
				
			});
			setErrors(validationErrors);
			return;
		}
		
		
		if (
			formData.username !== "admin" ||
			formData.password !== "password"
		) {
			setErrors({
				username: formData.username !== "admin" ? "Fel användarnamn" : "",
				password: formData.password !== "password" ? "Fel lösenord" : "",
			});
			return;
		}
		
		setErrors({}); 
		loginAsAdmin(); 
		navigate("/products"); 
	};
	
	
	return (
		<div className="login">
		{isLoggedIn && <p className='isLoggedIn'>Du är inloggad</p>}
		<form onSubmit={handleSubmit}>
		<div>
		<label htmlFor="username">Användarnamn:</label>
		<input 
		type="text" 
		id="username" 
		name="username" 
		value={formData.username}
		onChange={handleChange}
		onBlur={handleBlur}
		placeholder="Skriv användarnamn"
		required 
		/>
		{touched.username && errors.username && (
			<p className="error-message">{errors.username}</p>
		)}
		</div>
		<div>
		<label htmlFor="password">Lösenord:</label>
		<input 
		type="password" 
		id="password" 
		name="password" 
		value={formData.password}
		onChange={handleChange}
		onBlur={handleBlur}
		placeholder="Skriv lösenord"
		required 
		/>
		{touched.password && errors.password && (
			<p className="error-message">{errors.password}</p>
		)}
		</div>
		<button className='login-button' type="submit">Logga in</button>
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