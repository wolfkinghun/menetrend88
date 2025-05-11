import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import Login from './Components/Login';
import AdminPage from './Pages/AdminPage';
import Nevjegy from './Pages/Nevjegy'; 
import Register from './Components/Register'; // Import Register component
import { useAuth } from './hooks/useAuth';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/nevjegy', element: <Nevjegy /> },
  { path: '/register', element: <Register /> }, // Add the /register route
]);

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Betöltés...</div>;
  }

  return (
    <RouterProvider router={router}>
      {/* Render content only if user is logged in
      {!user ? (
        <div>Bejelentkezés szükséges!</div>
      ) : (
        <div>Welcome {user.email}</div>
      )} */}
    </RouterProvider>
  );
}

export default App;
