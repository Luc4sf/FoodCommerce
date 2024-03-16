import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Container } from "./styles";

import { ReactComponent as BurguerIcon } from "../../assets/burger.svg";
import { ReactComponent as PizzaIcon } from "../../assets/pizza.svg";
import { ReactComponent as DrinkIcon } from "../../assets/soda.svg";
import { ReactComponent as DessertIcon } from "../../assets/ice-cream.svg";

import menuImg from "../../assets/menu.svg";

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Container isMenuOpen={menuOpen}>
      <button type="button" onClick={handleToggleMenu}>
        <img src={menuImg} alt="Abrir e fechar o menu" />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to="burgers">
              <BurguerIcon />
              <span>Hambúrgueres</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="pizzas">
              <PizzaIcon />
              <span>Pizzas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="drinks">
              <DrinkIcon />
              <span>Bebidas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="desserts">
              <DessertIcon />
              <span>Sobremesas</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
