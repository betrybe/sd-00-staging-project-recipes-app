import React from 'react';
import PropTypes from 'prop-types';
import './details.css';
import ShLiButton from './ShareLikeButtons';

function DetailHeader({ Meal, details }) {
  return (
    <div>
      <img
        className="header-pic"
        alt={Meal ? details.strMeal : details.strDrink}
        data-testid="recipe-photo"
        src={Meal ? details.strMealThumb : details.strDrinkThumb}
      />
      <div className="details-header">
        <div className="title-side">
          <h2 className="det-title" data-testid="recipe-title">
            {Meal ? details.strMeal : details.strDrink}
          </h2>
          <h5 className="det-subtitle" data-testid="recipe-category">
            {details.strCategory} {!Meal ? `- ${details.strAlcoholic}` : ''}
          </h5>
        </div>
        <ShLiButton />
      </div>
    </div>
  );
}

export default DetailHeader;

DetailHeader.propTypes = {
  Meal: PropTypes.bool.isRequired,
  details: PropTypes.objectOf(PropTypes.object).isRequired,
};
