import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink, Outlet } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="App-header">
		<h1>Plaskis</h1>
			<nav className='links'>
				<NavLink to="/" >Start</NavLink>
				<NavLink to="/products" >Products</NavLink>
				<NavLink to="/cart" >Cart</NavLink>
				<NavLink to="/checkout" >Checkout</NavLink>
				<NavLink to="/login" >Login</NavLink>
				<NavLink to="/edit/:id" >Edit</NavLink>
				<NavLink to="/add" >Add</NavLink>
			</nav>
	  </header>
	  <main>
		<Outlet />
	  </main>
    </>
  )
}

export default App
