import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SnackData } from "../interfaces/SnackData";
import { Snack } from "../interfaces/Snack";

import { snackEmoji } from "../helpers/snackEmoji";
import { CustomerData } from "../interfaces/CustomerData";

interface CartContextProps {
  cart: Snack[];
  addSnackIntoCart: (snack: SnackData) => void;
  removeSnackFromCart: (snack: Snack) => void;
  snackCartIncrement: (snack: Snack) => void;
  snackCartDecrement: (snack: Snack) => void;
  confirmOrder: () => void;
  payOrder: (customer: CustomerData) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

const localStorageKey = "@FoodCommerce:cart";

export function CartProvider({ children }: CartProviderProps) {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Snack[]>(() => {
    const value = localStorage.getItem(localStorageKey);
    if (value) return JSON.parse(value);
    return [];
  });

  function saveCart(items: Snack[]) {
    setCart(items);

    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }

  function clearCart() {
    localStorage.removeItem(localStorageKey);
  }

  function addSnackIntoCart(snack: SnackData): void {
    const snackExistentInCart = cart.find(
      (item) => item.snack === snack.snack && item.id === snack.id,
    );

    if (snackExistentInCart) {
      const newCart = cart.map((item) => {
        if (item.snack === snack.snack && item.id === snack.id) {
          const quantity = item.quantity + 1;
          const subtotal = item.price * quantity;

          return { ...item, quantity, subtotal };
        }

        return item;
      });

      saveCart(newCart);
      toast.success(`Outro(a) ${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos!`);

      return;
    }

    const newSnack = { ...snack, quantity: 1, subtotal: snack.price };
    const newCart = [...cart, newSnack];

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos!`);
    saveCart(newCart);
  }

  function removeSnackFromCart(snack: Snack) {
    const newCart = cart.filter((item) => !(item.id === snack.id && item.snack === snack.snack));

    saveCart(newCart);
  }

  function updateSnackQuantity(snack: Snack, newQuantity: number) {
    if (newQuantity <= 0) return;

    const snackExistentInCart = cart.find(
      (item) => item.id === snack.id && item.snack === snack.snack,
    );

    if (!snackExistentInCart) return;

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity,
        };
      }
      return item;
    });

    saveCart(newCart);
  }

  function snackCartDecrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity - 1);
  }

  function snackCartIncrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity + 1);
  }

  function confirmOrder() {
    navigate("/FoodCommerce/payment");
  }

  async function payOrder() {
    clearCart();
    navigate(`/FoodCommerce/order/success/12`);

    return;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addSnackIntoCart,
        removeSnackFromCart,
        snackCartIncrement,
        snackCartDecrement,
        confirmOrder,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
