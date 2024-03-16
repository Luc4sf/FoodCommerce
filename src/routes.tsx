import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "./pages/Main";
import BurgersPage from "./pages/Main/Burgers";
import PizzasPage from "./pages/Main/Pizzas";
import DrinksPage from "./pages/Main/Drinks";
import DessertsPage from "./pages/Main/Desserts";

import MyCartPage from "./pages/MyCart";
import PaymentPage from "./pages/Payment";
import OrderSuccessPage from "./pages/Orders/Success";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/FoodCommerce" />} />
      <Route path="/FoodCommerce" element={<Navigate to="/FoodCommerce/burgers" />} />
      <Route path="/FoodCommerce" element={<MainPage />}>
        <Route path="burgers" element={<BurgersPage />} />
        <Route path="pizzas" element={<PizzasPage />} />
        <Route path="drinks" element={<DrinksPage />} />
        <Route path="desserts" element={<DessertsPage />} />
      </Route>
      <Route path="/FoodCommerce/cart" element={<MyCartPage />} />
      <Route path="/FoodCommerce/payment" element={<PaymentPage />} />
      <Route path="/FoodCommerce/order">
        <Route path="success/:orderId" element={<OrderSuccessPage />} />
      </Route>
    </Routes>
  );
}
