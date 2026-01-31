import Cart from "./Cart";
import Login from "./Login";
import Register from "./Register";
import Homme from "./nav/Homme";
import Femme from "./nav/Femme";
import Enfants from "./nav/Enfants";
import Accessoires from "./nav/Accessoires";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import All from "./All";
import Details from "./Details";
import { CartProvider } from "./CartContext";
import "@fontsource/poppins";

export default function Projets() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<All />} />
            <Route path="homme" element={<Homme />} />
            <Route path="femme" element={<Femme />} />
            <Route path="enfants" element={<Enfants />} />
            <Route path="accessoires" element={<Accessoires />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Details/:id" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
