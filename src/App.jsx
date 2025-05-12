import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import Login from './Components/Login';
import AdminPage from './Pages/AdminPage';
import Nevjegy from './Pages/Nevjegy'; 
import Register from './Components/Register'; // Import Register component
import { useAuth } from './hooks/useAuth';
import ContactForm from './Components/ContactForm'; // Import ContactForm component
import AddStream from './Components/AddStream';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/nevjegy', element: <Nevjegy /> },
  { path: '/register', element: <Register /> }, // Add the /register route
  { path: '/contact', element: <ContactForm /> },  // Add the /contact route
  { path: '/addStream', element: <AddStream/>}
]);

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Betöltés...</div>;
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
