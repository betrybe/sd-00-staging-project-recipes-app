import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../../context/AppContext';

import { getMealsByName, getMealsByIngredients, getMealsByLetter } from '../../../services/MealApi';
import {
  getDrinksByName,
  getDrinksByIngredients,
  getDrinksByLetter,
} from '../../../services/DrinkApi';

const fetchDrinkApi = (target, input, save) => {
  switch (target) {
    case 'name':
      return getDrinksByName(input).then((data) => save(data.drinks));
    case 'ing':
      return getDrinksByIngredients(input).then((data) => save(data.drinks));
    case 'letter':
      return getDrinksByLetter(input).then((data) => save(data.drinks));
    default:
      return -1;
  }
};

const fetchFoodApi = (target, input, save) => {
  switch (target) {
    case 'name':
      return getMealsByName(input).then((data) => save(data.meals));
    case 'ing':
      return getMealsByIngredients(input).then((data) => save(data.meals));
    case 'letter':
      return getMealsByLetter(input).then((data) => save(data.meals));
    default:
      return -1;
  }
};

const searchBtn = (recipeType, target, input, setDataDrink, setDataFood) => (
  <button
    data-testid="exec-search-btn"
    className="search-btn"
    type="button"
    onClick={() => {
      if (target === 'letter' && input.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return recipeType === 'Comidas'
        ? fetchFoodApi(target, input, setDataFood)
        : fetchDrinkApi(target, input, setDataDrink);
    }}
  >
    Buscar
  </button>
);

const SearchBar = ({ recipeType }) => {
  const [target, setTarget] = useState('name');
  const [input, setInput] = useState('');
  const { setDataFood, setDataDrink } = useContext(AppContext);
  return (
    <div className="search-box">
      <input
        data-testid="search-input"
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
        type="text"
      />
      <div>
        <input
          data-testid="ingredient-search-radio"
          onChange={() => setTarget('ing')}
          type="radio"
          id="ing"
          name="target"
        />
        <label htmlFor="ing">Ingredientes</label>
        <input
          data-testid="name-search-radio"
          onChange={() => setTarget('name')}
          type="radio"
          id="nome"
          name="target"
        />
        <label htmlFor="nome">Nome</label>
        <input
          data-testid="first-letter-search-radio"
          onChange={() => setTarget('letter')}
          type="radio"
          id="letra"
          name="target"
        />
        <label htmlFor="letra">Primeira Letra</label>
      </div>
      {searchBtn(recipeType, target, input, setDataDrink, setDataFood)}
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
