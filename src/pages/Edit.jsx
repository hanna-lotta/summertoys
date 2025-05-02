
const Edit = () => {
	return (
		<div>
			<h1>Edit Product</h1>
		</div>
	)

	/*
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`https://fakestoreapi.com/products/${id}`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct((prevProduct) => ({
			...prevProduct,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			navigate(`/products/${id}`);
		} catch (error) {
			setError(error);
		}
	};
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	 function Edit() {
		return (
			<div className="edit">
				<h1>Edit Product</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							id="title"
							name="title"
							value={product.title}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<textarea
							id="description"
							name="description"
							value={product.description}
							onChange={handleChange}
							required
						></textarea>
					</div>
					<div>
						<label htmlFor="price">Price:</label>
						<input
							type="number"
							id="price"
							name="price"
							value={product.price}
							onChange={handleChange}
							required
						/>
					</div>
					<button type="submit">Update Product</button>
				</form>
			</div>
		);
	}*/
	}
	export default Edit;