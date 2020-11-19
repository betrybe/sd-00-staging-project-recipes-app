import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.css';

function IngredientsDrink(props) {
  const { Drink } = props;
  let counter = 1;
  const ingredients = Object.keys(Drink).reduce((array, key) => {
    if (key.includes('strIngredient') && Drink[key] !== null && Drink[key].length > 0) {
      const object = {};
      object[key] = Drink[key];
      object[`strMeasure${counter}`] = Drink[`strMeasure${counter}`];
      counter += 1;
      return [...array, object];
    }
    return array;
  }, []);
  return (
    <>
      <div className="container-ingredients">
        <p className="ingredients-title">Ingredients</p>
        <div className="ingredients-box">
          {ingredients
            && ingredients.map((ingredient, index) => (
              <p key={`ingredient${index + 1}`} data-testid={`${index}-ingredient-name-and-measure`}>
                -
                {' '}
                {ingredient[`strIngredient${index + 1}`]}
                {' '}
                {ingredient[`strMeasure${index + 1}`]
                  ? `- ${ingredient[`strMeasure${index + 1}`]}`
                  : ''}
              </p>
            ))}
        </div>
      </div>
    </>
  );
}

export default IngredientsDrink;

IngredientsDrink.propTypes = {
  Drink: PropTypes.shape({
    strIngredient1: PropTypes.string,
    strIngredient2: PropTypes.string,
    strIngredient3: PropTypes.string,
    strIngredient4: PropTypes.string,
    strMeasure1: PropTypes.string,
    strMeasure2: PropTypes.string,
    strMeasure3: PropTypes.string,
    strMeasure4: PropTypes.string,
  }).isRequired,
};
