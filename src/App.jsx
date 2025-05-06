import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, NavLink, Outlet } from 'react-router'
import waterSplash from './assets/water-splash.svg';
import cart from './assets/mdi--cart-outline.svg';
import { useProductStore } from './data/ProductsStore';

function App() {
	const cartCount = useProductStore((state) => state.cart.length); // Hämta antal varor
  

  return (
    <>
      <header className="App-header">
		<h1>Plaskis</h1> <img className='water-img' src={waterSplash} alt="water-splash-image" />
			<nav className='links'>
				<NavLink to="/" >Start</NavLink>
				<NavLink to="/products" >Products</NavLink>
				<NavLink to="/cart" >Cart</NavLink>
				<NavLink to="/checkout" >Checkout</NavLink>
				<NavLink to="/login" >Login</NavLink>
				<NavLink to="/edit/:id" >Edit</NavLink>
				<NavLink to="/add" >Add</NavLink>
				
			</nav>
			<div className="cart-div">
			<Link to="/cart">
			<img className='cart-img' src={cart} alt="cart" />
			<span className="cart-count">{cartCount}</span> {/* Antal varor */}
			</Link>
			</div>
	  </header>
	  <main>
		<Outlet />
	  </main>
    </>
  )
}

export default App
