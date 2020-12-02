import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesAppContext';
import { fetchDrinkById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

function RecipeDrinkProcess(props) {
  const ZERO = 0;
  const VINTE = 20;
  const [arrIngredient, setArrIngredient] = useState([]);
  const [share, setShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { match } = props;
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);

  const settingRecipeInProgress = async () => {
    const response = await fetchDrinkById(id);
    // console.log(title);
    return setRecipes(response);
  };

  const renderIngredients = () => {
    const arr = [];
    for (let i = 1; i <= VINTE; i += 1) {
      if (recipes[0][`strIngredient${i}`]) {
        arr.push({ ingredient: recipes[0][`strIngredient${i}`], checked: false });
      } else {
        break;
      }
    }
    setArrIngredient(arr);
  };

  const checkIfIngredientIsSave = () => {
    if ((!localStorage.inProgressRecipes)) {
      const initialStorage = {
        meals: {},
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
    }
  };

  const markIngredient = (index, event) => {
    let newStorage = {};
    const copyArrIngredient = [...arrIngredient];
    copyArrIngredient[index].checked = event.target.checked;
    setArrIngredient(copyArrIngredient);

    const response = arrIngredient.filter((item) => item.checked === true)
      .map((name) => name.ingredient);

    const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (Object.keys(oldStorage.cocktails).length === ZERO) {
      newStorage = {
        ...oldStorage,
        cocktails: {
          [id]: response,
        },
      };
    } else {
      newStorage = {
        ...oldStorage,
        cocktails: {
          ...oldStorage.cocktails,
          [id]: oldStorage.cocktails[id].concat(response),
        },
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  const createCheckBoxes = () => (
    arrIngredient.map((ingredient, index) => (
      <label
        htmlFor={ ingredient.ingredient }
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ ingredient.checked ? 'checked' : '' }
      >
        <input
          type="checkbox"
          // checked={ ingredient.checked }
          id={ ingredient.ingredient }
          onClick={ (e) => markIngredient(index, e) }
        />
        { ingredient.ingredient }
      </label>
    ))
  );

  const addToFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipe = {
      id,
      type: 'bebida',
      area: recipes[0].strArea || '',
      category: recipes[0].strCategory,
      alcoholicOrNot: recipes[0].strAlcoholic,
      name: recipes[0].strDrink,
      image: recipes[0].strDrinkThumb,
    };

    const updatedFavoriteRecipes = [
      ...favoriteRecipes,
      recipe,
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  const removeFromFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavoriteRecipes = favoriteRecipes.filter((recipe) => (recipe.id !== id));

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  const handleFavorites = () => {
    if (isFavorite) removeFromFavoriteRecipes();
    else addToFavoriteRecipes();

    setIsFavorite(!isFavorite);
  };

  const copyClip = async () => {
    setShare(true);
    const url = `http://localhost:3000/bebidas/${id}`;
    await copy(url);
  };

  const checkIfRecipeIsFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes.some((recipe) => (recipe.id === id));
    if (isRecipeFavorite) setIsFavorite(true);
  };

  const handleCheckBoxes = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkBoxes.length > ZERO) {
      const savedRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(savedRecipe.cocktails).length !== ZERO) {
        checkBoxes.forEach((box) => {
          savedRecipe.cocktails[id].forEach((drink) => {
            console.log(box);
            if (box.id === drink) {
              console.log(box);
              box.setAttribute('checked', true);
            }
          });
        });
      }
    }
  };

  useEffect(() => {
    settingRecipeInProgress();
    checkIfRecipeIsFavorite();
    checkIfIngredientIsSave();
    settingRecipeInProgress();
  }, []);

  useEffect(() => {
    handleCheckBoxes();
  }, [createCheckBoxes]);

  useEffect(() => {
    if (recipes.length > ZERO) renderIngredients();
  }, [recipes]);

  if (recipes.length > ZERO) {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipes[0].strDrinkThumb }
          alt="imagem"
        />
        <h4
          data-testid="recipe-title"
        >
          { recipes[0].strDrink }
        </h4>
        <button
          type="button"
          onClick={ () => copyClip() }
          data-testid="share-btn"
        >
          <img
            src={ shareIcon }
            alt="compartilhar"
          />
        </button>
        {share && <span>Link copiado!</span>}
        <div>
          <button
            type="button"
            onClick={ handleFavorites }
          >
            <img
              data-testid="favorite-btn"
              alt="Favoritar"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
        </div>
        <h5
          data-testid="recipe-category"
        >
          {recipes[0].strCategory}
        </h5>
        <div className="checkbox">
          { createCheckBoxes() }
        </div>
        <p data-testid="instructions">{ recipes[0].strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => props.history.push('/receitas-feitas') }
          disabled={ !arrIngredient.every((item) => item.checked) }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
  return (
    <span>...Loading</span>
  );
}

RecipeDrinkProcess.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDrinkProcess;
