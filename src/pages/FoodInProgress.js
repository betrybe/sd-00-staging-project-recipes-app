import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import './RecipeInProgress.css';

function FoodInProgress(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  // const [copied, setCopied] = useState('none');
  const textArea = useRef(null);
  const now = new Date();
  let progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const zero = 0;
  if (progressRecipes === null) {
    progressRecipes = {
      cocktails: {},
      meals: { [id]: [] },
    };
  }

  const setLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = readLocalStorage !== null ? readLocalStorage : [];
    const newRecipe = { id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    favoriteRecipes.push(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const copyToClipboard = (e) => {
    textArea.current.select();
    document.execCommand('copy');
    e.target.focus();
    // setCopied('block');
  };

  const recipeAPI = async () => {
    const response = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    setRecipe(response.meals[0]);
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (recipe.length !== zero
          && recipe[`strIngredient${i}`] !== null
          && recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== undefined
      ) {
        const value = `${recipe[`strMeasure${i}`]}${recipe[`strIngredient${i}`]}`;
        const ingredient = {
          id: i,
          value,
          isChecked: progressRecipes.meals[id].some((e) => e === value),
        };
        TheIngredients.push(ingredient);
      }
    }
    setIngredients(TheIngredients);
  };

  const setLocalIngredients = () => {
    if (ingredients.length !== zero) {
      const checkeds = ingredients
        .filter((ingredient) => ingredient.isChecked === true)
        .map((each) => each.value);
      progressRecipes.meals[id] = checkeds;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipes));
    }
  };

  const removeIdLocalSotrage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };

  const getLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idFavorito = readLocalStorage !== null
      ? readLocalStorage.find((element) => element.id === id)
      : undefined;
    if (idFavorito) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const handleCheckedIngredient = (event, index) => {
    const ingredientsChecked = [...ingredients];
    ingredientsChecked[index].isChecked = event.target.checked;
    setIngredients(ingredientsChecked);
  };

  const changesFavorites = () => {
    if (isFavorite) {
      removeIdLocalSotrage();
      setIsFavorite(!isFavorite);
    } else {
      setLocalStorage();
      setIsFavorite(!isFavorite);
    }
  };

  useEffect(() => {
    setLocalIngredients();
  }, [ingredients]);

  useEffect(() => {
    requestIngredients();
  }, [recipe]);

  const handleFinishedRecipe = () => {
    const finishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const arrayFinished = finishedRecipes !== null ? finishedRecipes : [];
    arrayFinished.push({
      id,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: `Feita em: ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
      tags: recipe.strTags,
    });
    localStorage.setItem('doneRecipes', JSON.stringify(arrayFinished));

    history.push('/receitas-feitas');
  };

  useEffect(() => {
    recipeAPI();
    getLocalStorage();
  }, []);

  const isDisabled = ingredients.some((ingredient) => ingredient.isChecked === false);

  return (
    <div>
      <img
        className="picture"
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <ShareBtn copy={ copyToClipboard } />
      <FavoriteBtn isFavorite={ isFavorite } changesFavorites={ changesFavorites } />
      <p data-testid="recipe-category">{ recipe.strCategory }</p>

      <ul>
        Ingredientes:
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            { ingredient.value }
            <input
              className={ ingredient.isChecked ? 'checked' : '' }
              key={ ingredient.id }
              type="checkbox"
              value={ ingredient.value }
              checked={ ingredient.isChecked }
              onChange={ (ev) => handleCheckedIngredient(ev, index) }
            />
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <textarea
        className="text-area"
        ref={ textArea }
        value={ `http://localhost:3000/comidas/${id}` }
      />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleFinishedRecipe }
      >
        Finalizar receita
      </button>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodInProgress;
