import { Link, NavLink } from 'react-router';
import { useCartStore } from '../data/cartStore';
import cart from '../assets/mdi--cart-outline.svg';
import waterSplash from '../assets/water-splash.svg';

const Header = () => {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  ); 

  return (
    <header className="App-header">
      <h1>Plaskis</h1>
      <img className="water-img" src={waterSplash} alt="water-splash-image" />
      <nav className="links">
        <NavLink to="/">Start</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/edit/:id">Edit</NavLink>
        <NavLink to="/add">Add</NavLink>
      </nav>
      <div className="cart-div">
        <Link to="/cart">
          <img className="cart-img" src={cart} alt="cart" />
          <span className="cart-count">{cartCount}</span> {/* Antal varor */}
        </Link>
      </div>
    </header>
  );
};

export default Header;