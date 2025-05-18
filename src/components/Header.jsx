import { Link, NavLink } from 'react-router';
import { useCartStore } from '../data/cartStore';
import cart from '../assets/mdi--cart-outline.svg';
import waterSplash from '../assets/water-splash.svg';
import './Header.css';

const Header = () => {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  ); 

  return (
    <header className="App-header">
		<NavLink to="/" className={"logo-link"}>
	<div  className="logo-div">
      <h1>Plaskis</h1>
      <img className="water-img" src={waterSplash} alt="water-splash-image" />
     </div>
		</NavLink>
       <nav className="links">
      </nav>
      <div className="cart-div">
        <Link to="/cart">
          <img className="cart-img" src={cart} alt="cart" />
          <span className="cart-count">{cartCount}</span> 
        </Link>
      </div>
    </header>
  );
};



export default Header;