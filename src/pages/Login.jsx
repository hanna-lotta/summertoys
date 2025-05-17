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

	const [formData, setFormData] = useState({ username: '', password: '' });
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({username: false, password: false});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};


    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validera formulärdata med Joi
		const { error } = schema.validate(formData, { abortEarly: false });
			if (error) {
			const validationErrors = {};
			error.details.forEach((detail) => {
				const key = detail.path[0];
      		if (key === "username") {
        	validationErrors[key] = "Användarnamn måste vara 3-20 tecken och bara bokstäver/siffror.";
      		} else if (key === "password") {
        	validationErrors[key] = "Lösenordet måste vara 3-30 tecken och bara bokstäver/siffror.";
      		} else {
        	validationErrors[key] = detail.message; // fallback
     		 }
				
			});
			setErrors(validationErrors);
			return;
		}

		// Kontrollera om användarnamn och lösenord är rätt
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

		setErrors({}); // Rensa eventuella tidigare fel
		loginAsAdmin(); 
		navigate("/products"); 
	};
	

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
					onBlur={handleBlur}
					placeholder="Skriv användarnamn här"
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
					placeholder="Skriv lösenord här"
					required 
					/>
					{touched.password && errors.password && (
                        <p className="error-message">{errors.password}</p>
                    )}
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