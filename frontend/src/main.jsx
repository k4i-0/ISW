import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
// import Prueba from './routes/PruebaExam.jsx';
import Cprueba from './routes/CrearPrueba.jsx';
import Apregunta from './routes/ActualizarPrueba.jsx'
import Rprueba from './routes/PruebaPos.jsx'
import Vpruebas from './routes/Pruebas.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      /*
      {
        path: '/vista-prueba',
        element: <Prueba/>,
      },
      */
      {
        path: '/vista-pruebas',
        element: <Vpruebas/>,
      },
      {
        path:'/crear-prueba',
        element: <Cprueba/>
      },
      {
        path: '/actualizar-pregunta',
        element: <Apregunta/>
      },
      {
        path: '/prueba',
        element: <Rprueba/>
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
