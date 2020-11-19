import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import AppContext from '../../context/AppContext';

import { getMeals, getMealsAreas, getMealsByArea } from '../../services/MealApi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './index.css';

const listMeals = (foodArray) => foodArray.map((food, index) => (
  <div className="recipe-card" key={food.strMeal} data-testid={`${index}-recipe-card`}>
    <Link to={`/comidas/${food.idMeal}`}>
      <img
        className="thumbnail"
        data-testid={`${index}-card-img`}
        src={food.strMealThumb}
        alt="thumbnail da comida"
      />
      <p data-testid={`${index}-card-name`}>{food.strMeal}</p>
    </Link>
  </div>
));

const dropDownArea = (setDataFood, foodArea, dataFoodAreas, setFoodArea) => (
  <select
    onClick={({ target }) => {
      if (target.value !== 'all') setFoodArea(target.value);
      else {
        setFoodArea(false);
        getMeals().then((data) => setDataFood(data.meals.slice(0, 12)));
      }
    }}
    className="select-area"
    data-testid="explore-by-area-dropdown"
  >
    <option value="all" data-testid="All-option">
      All
    </option>
    {dataFoodAreas.map(({ strArea }) => (
      <option key={strArea} value={strArea} data-testid={`${strArea}-option`}>
        {strArea}
      </option>
    ))}
  </select>
);

const ExplorarOrigem = () => {
  const {
    dataFood,
    setDataFood,
    dataFoodAreas,
    setDataFoodAreas,
    foodArea,
    setFoodArea,
  } = useContext(AppContext);
  useEffect(() => {
    getMealsAreas().then((data) => setDataFoodAreas(data.meals));
  }, [setDataFoodAreas]);
  useEffect(() => {
    if (foodArea) {
      getMealsByArea(foodArea).then((data) => setDataFood(data.meals.slice(0, 12)));
    }
  }, [foodArea, setDataFood]);
  let foodArray = dataFood;
  if (!Array.isArray(dataFood)) {
    foodArray = [];
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (!foodArea && dataFood.length === 1) {
    return <Redirect to={`/comidas/${dataFood[0].idMeal}`} />;
  } else if (dataFood.length === 0) getMeals().then((data) => setDataFood(data.meals.slice(0, 12)));
  if (foodArray.length > 12) foodArray = foodArray.slice(0, 12);

  return (
    <div className="recipes-container">
      <Header>Explorar Origem</Header>
      {dropDownArea(setDataFood, foodArea, dataFoodAreas, setFoodArea)}
      {listMeals(foodArray)}
      <Footer />
    </div>
  );
};

export default ExplorarOrigem;
