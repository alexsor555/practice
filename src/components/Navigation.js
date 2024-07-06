import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li><NavLink to="/" exact>Главная</NavLink></li>
        <li><NavLink to="/calendar">Календарь</NavLink></li>
        <li><NavLink to="/todo">Список дел</NavLink></li>
        <li><NavLink to="/account">Личный кабинет</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
