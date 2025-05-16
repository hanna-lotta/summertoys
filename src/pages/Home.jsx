import './Home.css';
import { Link } from 'react-router';

const Home = () => {
	
  return (
	<div className="home">
	  <h1 className='punchline'>Låt vattenleken börja!</h1>

	  <Link to="/products" className='go-to-shop' >Kolla in våra leksaker</Link>
	  <h3 className='info-text'>Vi har sommarens leksaker för badet och lite till! Ovansett om du vill ta badet hem till dig eller för strandens utflykter. Våra produkter är noga utvalda och testade för att ge dig och dina barn den bästa möjliga upplevelsen. Vi erbjuder ett brett utbud av badleksaker, pooler och mycket mer för att göra din sommar oförglömlig.</h3>

	 <img className="home-img" src="https://www.gp.se/images/article/d75dfccf-3bb5-4d03-a8bb-74f449f77482/images/0vZQC2ysy7SP-7LrrgLuz3qz-wJI-REGULAR.jpg?width=1920&quality=75" alt="Plaskis" />
	</div>
  );
}
export default Home;