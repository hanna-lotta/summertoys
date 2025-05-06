import './Add.css';

const Add = () => {
	return (
		<div className="add-product">
			<h1>Lägg till produkt</h1>
			<form>
				<div>
					<label htmlFor="name">Namn:</label>
					<input type="text" id="name" name="name" required />
				</div>
				<div>
					<label htmlFor="description">Beskrivning:</label>
					<textarea id="description" name="description" required></textarea>
				</div>
				<div>
					<label htmlFor="price">Pris:</label>
					<input type="number" id="price" name="price" required />
				</div>
				<button type="submit">Lägg till produkt</button>
			</form>
		</div>
	);
}
export default Add;