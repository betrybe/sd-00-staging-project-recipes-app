import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Context';
import history from '../helpers/History';

import '../css/Cards.css';

export default function Cards({ id }) {
  const { items } = useContext(RecipesContext);

  function handleRedirect() {
    if (items && items.meals) {
      if (items.meals.length === 1) {
        const itemId = items.meals[0].idMeal;
        history.push(`/${id}/${itemId}`);
      }
    } else if (items && items.drinks) {
      if (items.drinks.length === 1) {
        const itemId = items.drinks[0].idDrink;
        history.push(`/${id}/${itemId}`);
      }
    }
  }

  if (items) {
    handleRedirect();
    if (items.drinks) {
      return (
        <div className="cards-wrapper">
          {items.drinks.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idDrink}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de drink"
                />
                <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
    if (items.meals) {
      return (
        <div className="cards-wrapper">
          {items.meals.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idMeal}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de comida"
                />
                <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  }
  return (
    <div>Faça uma busca</div>
  );
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
};
