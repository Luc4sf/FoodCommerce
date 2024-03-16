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
        const burgerRequest = await getBurgers();
        const pizzaRequest = await getPizzas();
        const drinkRequest = await getDrinks();
        const dessertRequest = await getDesserts();

        const requests = [burgerRequest, pizzaRequest, drinkRequest, dessertRequest];

        const [
          { data: burgerResponse },
          { data: pizzaResponse },
          { data: drinkResponse },
          { data: dessertResponse },
        ] = await Promise.all(requests);

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
