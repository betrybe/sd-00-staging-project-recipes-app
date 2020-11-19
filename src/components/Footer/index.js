import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../../context/AppContext';

import drinkIcon from '../../images/drinkIcon.png';
import exploreIcon from '../../images/exploreIcon.png';
import foodIcon from '../../images/mealIcon.png';

import './index.css';

const Footer = () => {
  const { setRecipeType } = useContext(AppContext);
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <input
          height="40"
          data-testid="drinks-bottom-btn"
          onClick={() => setRecipeType('Drink')}
          src={drinkIcon}
          type="image"
          alt="drink icon"
        />
      </Link>
      <Link to="/explorar">
        <input data-testid="explore-bottom-btn" src={exploreIcon} type="image" alt="explore icon" />
      </Link>
      <Link to="/comidas">
        <input
          data-testid="food-bottom-btn"
          onClick={() => setRecipeType('Food')}
          src={foodIcon}
          type="image"
          alt="food icon"
        />
      </Link>
    </footer>
  );
};

export default Footer;
