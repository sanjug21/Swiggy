import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Offers from './components/Offers.jsx';
import Help from './components/Help.jsx';
import Cart from './components/Cart.jsx';
import SignIn from './components/SignIn.jsx';
import Body from './components/Body.jsx';

const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
        index: true
      },
      {
        path: '/offers',
        element: <Offers />
      },
      {
        path: '/help',
        element: <Help />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/signIn',
        element: <SignIn />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRoutes} />
  </StrictMode>,
);