import Joi from 'joi';
import './Login.css';
import { validateForm } from '../data/Validation';
//import { useToyStore } from '../data/toyStore.js';

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

	const { message, formIsValid } = validateForm();

	return (
		<div className="login">
			<h1>Logga in</h1>
			<form>
				<div>
					<label htmlFor="username">Användarnamn:</label>
					<input type="text" id="username" name="username" required />
					<div>
						<p className="error-message">Användarnamn måste vara mellan 3 och 20 tecken långt och får endast innehålla bokstäver och siffror.</p>
					</div>
				</div>
				<div>
					<label htmlFor="password">Lösenord:</label>
					<input type="password" id="password" name="password" required />
				</div>
				<div>
					<p className="error-message">Lösenordet måste vara mellan 3 och 30 tecken långt och får endast innehålla bokstäver och siffror.</p>
				</div>
				<button type="submit">Logga in</button>
			</form>
		</div>
	);
}
export default Login;