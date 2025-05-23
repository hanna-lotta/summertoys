import Joi from "joi";

const schema = Joi.object({

	title: Joi.string()
		.min(2)
		.required(),
	description: Joi.string()
		.min(10)
		.required(),
	price: Joi.number()
		.positive()
		.required(),

	img: Joi.string()
		.pattern(/^https?:\/\/.*\.(jpeg|jpg|gif|png|webp|svg)([/?].*)?$/i)
		.required(),
	
}).unknown(true) // Tillåter okända fält

function validateForm(data, touched = {}) {
	const results = schema.validate(data, {abortEarly: false});
	let css = {
		title: '',
		description: '',
		price: '',
		img: '',		
	}


  if (touched.title && (!results.error || !results.error.details.some(e => e.context.key === 'title'))) {
    css.title = 'valid';
  }
  if (touched.description && (!results.error || !results.error.details.some(e => e.context.key === 'description'))) {
    css.description = 'valid';
  }
  if (touched.price && (!results.error || !results.error.details.some(e => e.context.key === 'price'))) {
    css.price = 'valid';
  }
  if (touched.img && (!results.error || !results.error.details.some(e => e.context.key === 'img'))) {
    css.img = 'valid';
  }

	let message = {
		title: '',
		description: '',
		price: '',
		img: '',
	};

	 if (results.error) {
        results.error.details.forEach(element => {
            const key = element.context.key;
            if (!touched[key]) return; 

            css[key] = 'invalid';

            if (key === 'title') {
                message.title = 'skriv minst 2 tecken';
            } else if (key === 'description') {
                message.description = 'skriv minst 10 tecken';
            } else if (key === 'price') {
                message.price = 'skriv ett giltigt pris';
            } else if (key === 'img') {
                message.img = 'skriv en giltig URL';
            }
        });
    }
    const formIsValid = !results.error;
    return { message, css, formIsValid };
}


export { validateForm };
