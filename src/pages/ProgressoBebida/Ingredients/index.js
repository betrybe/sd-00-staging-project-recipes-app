import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './index.css';
import AppContext from '../../../context/AppContext';

const changeLocalStorage = (option, id, setRecipesInProgress) => {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: { [id]: [] },
    meals: {},
  };
  const progressMeals = {
    ...recipesInProgress,
    cocktails: { [id]: [...recipesInProgress.cocktails[id], option] },
  };
  setRecipesInProgress(progressMeals);
  return localStorage.setItem('inProgressRecipes', JSON.stringify(progressMeals));
};

const removeFromLocalStorage = (option, id, setRecipesInProgress) => {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: { [id]: [] },
    meals: {},
  };
  const progressMeals = {
    ...recipesInProgress,
    cocktails: { [id]: recipesInProgress.cocktails[id].filter((item) => item !== option) },
  };
  setRecipesInProgress(progressMeals);
  return localStorage.setItem('inProgressRecipes', JSON.stringify(progressMeals));
};

const toggleCheck = (target, id, setRecipesInProgress, setRecipeDone) => {
  const label = document.querySelector(`label[for=${target.id}]`);
  if (label.style.textDecoration === 'line-through') {
    removeFromLocalStorage(target.id, id, setRecipesInProgress);
  } else {
    changeLocalStorage(target.id, id, setRecipesInProgress);
  }
  if (
    document.querySelectorAll('input[type=checkbox]:checked').length
    === document.querySelectorAll('input[type=checkbox]').length
  ) {
    setRecipeDone(true);
  }
};

function IngredientsDrink({ Drink }) {
  const { id } = useParams();
  const { setRecipeDone } = useContext(AppContext);
  const recipeDoneToggle = (value) => setRecipeDone(value);
  const [recipesInProgress, setRecipesInProgress] = useState({});
  useEffect(() => {
    const localStore = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: { [id]: [] },
      meals: {},
    };
    if (!localStore.cocktails[id]) {
      const inProgressRecipe = { ...localStore, cocktails: { ...localStore.cocktails, [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(localStore));
    }
    setRecipesInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  }, [setRecipesInProgress, id]);
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
    <div className="container-ingredients">
      <p className="ingredients-title">Ingredients</p>
      <div className="ingredients-box">
        {ingredients.map((ingredient, index) => (
          <div key={`ingredient${index + 1}`} data-testid={`${index}-ingredient-step`}>
            <input
              checked={recipesInProgress.cocktails[id].some(
                (item) => item === `ingredient${index + 1}`,
              )}
              id={`ingredient${index + 1}`}
              type="checkbox"
              onChange={(e) => toggleCheck(e.target, id, setRecipesInProgress, recipeDoneToggle)}
            />
            <label
              style={{
                textDecoration: recipesInProgress.cocktails[id].some(
                  (item) => item === `ingredient${index + 1}`,
                )
                  ? 'line-through'
                  : 'inherit',
              }}
              htmlFor={`ingredient${index + 1}`}
            >
              {`${ingredient[`strIngredient${index + 1}`]}
            ${
              ingredient[`strMeasure${index + 1}`]
                ? `- ${ingredient[`strMeasure${index + 1}`]}`
                : ''
            }`}
            </label>
          </div>
        ))}
      </div>
    </div>
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
