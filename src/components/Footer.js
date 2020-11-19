import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './header.css';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import AppContext from '../contexts/AppContext';

function handleClick(path, setSelecCategory, history) {
  setSelecCategory('');
  history.push(`/${path}`);
}

export default function Footer() {
  const history = useHistory();
  const { setSelecCategory } = useContext(AppContext);
  return (
    <div className="navbar fixed-bottom footer-comp" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        onClick={() => handleClick('bebidas', setSelecCategory, history)}
        src={drinks}
      >
        <img alt="drinks" src={drinks} />
      </button>
      <button onClick={() => handleClick('explorar', setSelecCategory, history)}>
        <img data-testid="explore-bottom-btn" alt="explorar" src={explore} />
      </button>
      <button onClick={() => handleClick('comidas', setSelecCategory, history)}>
        <img alt="comidas" data-testid="food-bottom-btn" src={meal} />
      </button>
    </div>
  );
}
