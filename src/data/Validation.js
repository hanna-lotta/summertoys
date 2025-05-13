import Joi from "joi";

const schema = Joi.object({

	name: Joi.string()
		.min(1)
		.required(),
	description: Joi.string()
		.min(5)
		.required(),
	price: Joi.number()
		.positive()
		.required(),

	img: Joi.string()
		.uri()
		.required(),
	
});

function validateForm(data) {
	const results = schema.validate(data);

	let message = {
		name: '',
		description: '',
		price: '',
		img: '',
	};

	if (results.error) {
		return results.error.details.array.forEach(element => {
			if (element.context.key === 'name') {
				message.name = 'skriv minst 1 tecken';
				//return `Minst ${element.context.limit} tecken krävs.`;
			} else if (element.context.key === 'description') {
				message.description = 'skriv minst 5 tecken';
				//return `Minst ${element.context.limit} tecken krävs.`;
			}
			else if (element.context.key === 'price') {
				message.price = 'skriv minst 1 tecken';
				//return `Minst ${element.context.limit} tecken krävs.`;
			}
			else if (element.context.key === 'img') {
				message.img = 'skriv minst 1 tecken';
				//return `Minst ${element.context.limit} tecken krävs.`;
			}
		}); 	//=> detail.message);
	}
	const formIsValid = !results.error;
	return {message, formIsValid };
}
export { validateForm };
