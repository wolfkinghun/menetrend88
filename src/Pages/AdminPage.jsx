import React from "react";
import { useAuth } from "../hooks/useAuth"; // useAuth hook importálása
import Logout from "../Components/Logout";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth(); // A felhasználó és az admin státusz lekérése
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Ha a betöltés folyamatban van, mutass egy töltés animációt
  }

  if (!user) {
    return <div>Please log in to access the admin page.</div>; // Ha nincs bejelentkezett felhasználó, kérjük, jelentkezzen be
  }

  if (!isAdmin) {
    return <div>You do not have admin rights.</div>; // Ha nem admin, ezt mutassuk
  }

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      {/* Admin tartalom */}
      <Logout />
    </div>
  );
};

export default AdminPage;
