import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Edit from './pages/Edit.jsx';
import Add from './pages/Add.jsx';

const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            { 
				index: true, 
			    Component: Home
			},
            { 
				path: '/products',
			    Component: Products
			},
			{
				path: '/products/:id',
				Component: ProductDetails
			},
			{ 
				path: '/cart', 
			    Component: Cart 
			},
			{ 
				path: '/checkout', 
			    Component: Checkout 
			},
            { 
				path: '/login', 
			    Component: Login 
			},
			{   path: '/edit/:id',
				Component: Edit
			},
			{
				path: '/add',
				Component: Add
			}
        ],
    },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
