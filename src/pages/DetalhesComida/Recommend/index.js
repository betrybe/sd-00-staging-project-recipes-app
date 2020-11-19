import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';

const listDrink = (drinkFood) => drinkFood.map((drink, index) => (
  <div className="recipe-card" key={drink.strDrink} data-testid={`${index}-recomendation-card`}>
    <Link to={`/bebidas/${drink.idDrink}`}>
      <img className="thumbnail" src={drink.strDrinkThumb} alt="thumbnail da comida" />
      <p data-testid={`${index}-recomendation-title`}>{drink.strDrink}</p>
    </Link>
  </div>
));

const RecommendDrink = (props) => {
  const { drink } = props;
  if (drink.length > 0) {
    return (
      <>
        <h2 className="recome-title">Recomendadas</h2>
        <div className="recommended-recipes-container">{listDrink(drink)}</div>
      </>
    );
  }
  return <h1>Loading...</h1>;
};

export default RecommendDrink;

RecommendDrink.propTypes = {
  drink: PropTypes.arrayOf(
    PropTypes.shape({
      strMealThumb: PropTypes.string,
      strMeal: PropTypes.string,
      idMeal: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
