import { createContext, useState, useEffect, ReactNode } from "react";

import { SnackData } from "../interfaces/SnackData";

import { getBurgers, getPizzas, getDrinks, getDesserts } from "../services/api";

interface SnackContextProps {
  burgers: SnackData[];
  pizzas: SnackData[];
  drinks: SnackData[];
  desserts: SnackData[];
}

interface SnackProviderProps {
  children: ReactNode;
}

export const SnackContext = createContext({} as SnackContextProps);

export function SnackProvider({ children }: SnackProviderProps) {
  const [burgers, setBurgers] = useState<SnackData[]>([]);
  const [pizzas, setPizzas] = useState<SnackData[]>([]);
  const [drinks, setDrinks] = useState<SnackData[]>([]);
  const [desserts, setDesserts] = useState<SnackData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const burgerResponse = await getBurgers();
        const pizzaResponse = await getPizzas();
        const drinkResponse = await getDrinks();
        const dessertResponse = await getDesserts();

        setBurgers(burgerResponse);
        setPizzas(pizzaResponse);
        setDrinks(drinkResponse);
        setDesserts(dessertResponse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <SnackContext.Provider value={{ burgers, pizzas, drinks, desserts }}>
      {children}
    </SnackContext.Provider>
  );
}
