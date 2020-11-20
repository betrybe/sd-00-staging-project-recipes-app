import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './searchbar.css';
import * as api from '../services/api';
import AppContext from '../contexts/AppContext';

function filterAPIComidas(ing, type, setResults) {
  switch (type) {
    case 'ingredient':
      api.byMealIngredient(ing).then((data) => setResults(data.meals));
      return true;
    case 'name':
      api.byMealName(ing).then((data) => setResults(data.meals));
      return true;
    case 'first-letter':
      return ing.length > 1
        ? alert('Sua busca deve conter somente 1 (um) caracter')
        : api.byMealFirstLetter(ing).then((data) => setResults(data.meals));
    default:
      return false;
  }
}

function filterAPIBebidas(ing, type, setResults) {
  switch (type) {
    case 'ingredient':
      api.byDrinkIngredient(ing).then((data) => {
        if (data === undefined) return setResults(null);
        return setResults(data.drinks);
      });
      return true;
    case 'name':
      api.byDrinkName(ing).then((data) => setResults(data.drinks));
      return true;
    case 'first-letter':
      return ing.length > 1
        ? alert('Sua busca deve conter somente 1 (um) caracter')
        : api.byDrinkFirstLetter(ing).then((data) => setResults(data.drinks));
    default:
      return false;
  }
}

// INPUTS RADIO BUTTON
const radiosBtn = (radioFilter) => {
  const radios = [
    {
      filterValue: 'ingredient',
      dataTestID: 'ingredient-search-radio',
      title: 'Ingrediente',
    },
    { filterValue: 'name', dataTestID: 'name-search-radio', title: 'Nome' },
    {
      filterValue: 'first-letter',
      dataTestID: 'first-letter-search-radio',
      title: 'Primeira Letra',
    },
  ];
  return (
    <div className="radio-container">
      {radios.map((radio) => (
        <div key={radio.filterValue} className="radio-opt">
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id={radio.title}
            value={radio.filterValue}
            data-testid={radio.dataTestID}
            onClick={(e) => radioFilter(e.target.value)}
          />
          <label htmlFor={radio.title}>{radio.title}</label>
        </div>
      ))}
    </div>
  );
};

// LÓGICA CASO SÓ TENHA 1 RESPOSTA OU NENHUMA CONSIDERANDO OS FILTROS APLICADOS
const resultValidation = (history, filteredData, setData) => {
  if (filteredData === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return setData('');
  }
  if (
    filteredData.length === 1 &&
    filteredData !== null &&
    history.location.pathname === '/comidas'
  ) {
    return history.push(`/comidas/${filteredData[0].idMeal}`);
  }
  if (
    filteredData.length === 1 &&
    filteredData !== null &&
    history.location.pathname === '/bebidas'
  ) {
    return history.push(`/bebidas/${filteredData[0].idDrink}`);
  }
  return true;
};

// COMPONENTE SEARCHBAR
export default function SearchBar() {
  const history = useHistory();
  const { searchBarOn, filteredData, setFilteredData } = useContext(AppContext);
  const [ingredientName, setIngredientName] = useState('');
  const [radioFilter, setRadioFilter] = useState();

  useEffect(() => {
    resultValidation(history, filteredData, setFilteredData);
  }, [filteredData]);

  const hClick = () => {
    const pathname = history.location.pathname;
    if (pathname === '/bebidas') {
      return filterAPIBebidas(ingredientName, radioFilter, setFilteredData);
    }
    return filterAPIComidas(ingredientName, radioFilter, setFilteredData);
  };

  if (searchBarOn) {
    return (
      <div className="search-container">
        <input
          className="form-control"
          data-testid="search-input"
          placeholder="Digite sua busca"
          onChange={(e) => setIngredientName(e.target.value)}
        />
        {radiosBtn(setRadioFilter)}
        <button className="btn btn-amarelo" data-testid="exec-search-btn" onClick={() => hClick()}>
          Buscar
        </button>
      </div>
    );
  }
  return <FilterButtons />;
}

// COMPONENT FILTERBUTTONS
export function FilterButtons() {
  const history = useHistory();
  const { setSelecCategory, selecCategory } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const handleCat = (e) => {
    if (selecCategory !== e.target.value) {
      setSelecCategory(e.target.value);
    } else {
      setSelecCategory('');
    }
  };

  useEffect(() => {
    if (history.location.pathname === '/comidas') {
      api.mealCategories().then((data) => setCategories(data.meals));
    }
    if (history.location.pathname === '/bebidas') {
      api.drinkCategories().then((data) => setCategories(data.drinks));
    }
  }, [history.location.pathname]);

  return (
    <div className="btn-toolbar cat-section">
      <button
        className="btn btn-sm cat-btn"
        value="All"
        data-testid="All-category-filter"
        onClick={(e) => handleCat(e)}
      >
        All
      </button>
      {categories
        .filter((cat, i) => i < 5)
        .map((cat) => (
          <button
            key={cat.id}
            className="btn btn-sm cat-btn"
            data-testid={`${cat.strCategory}-category-filter`}
            value={cat.strCategory}
            onClick={(e) => handleCat(e)}
          >
            {cat.strCategory}
          </button>
        ))}
    </div>
  );
}
