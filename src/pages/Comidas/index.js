import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import AppContext from '../../context/AppContext';

import { getMeals, getMealsCategories, getMealsByCategory } from '../../services/MealApi';

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

const listCategories = (setDataFood, foodCategory, dataFoodCategories, setFoodCategory) => (
  <div>
    <button
      type="button"
      onClick={async () => {
        await getMeals().then((data) => setDataFood(data.meals.slice(0, 12)));
        await setFoodCategory(false);
      }}
      data-testid="All-category-filter"
    >
      All
    </button>
    {dataFoodCategories.map(({ strCategory }) => (
      <button
        type="button"
        key={strCategory}
        onClick={() => {
          if (foodCategory !== strCategory) setFoodCategory(strCategory);
          else {
            setFoodCategory(false);
            getMeals().then((data) => setDataFood(data.meals.slice(0, 12)));
          }
        }}
        data-testid={`${strCategory}-category-filter`}
      >
        {strCategory}
      </button>
    ))}
  </div>
);

const Comidas = () => {
  const {
    dataFood,
    setDataFood,
    dataFoodCategories,
    setDataFoodCategories,
    foodCategory,
    setFoodCategory,
  } = useContext(AppContext);
  useEffect(() => {
    getMealsCategories().then((data) => setDataFoodCategories(data.meals.slice(0, 5)));
  }, [setDataFoodCategories]);
  useEffect(() => {
    if (foodCategory) {
      getMealsByCategory(foodCategory).then((data) => setDataFood(data.meals.slice(0, 12)));
    }
  }, [foodCategory, setDataFood]);
  let foodArray = dataFood;
  if (!Array.isArray(dataFood)) {
    foodArray = [];
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (!foodCategory && dataFood.length === 1) {
    return <Redirect to={`/comidas/${dataFood[0].idMeal}`} />;
  } else if (dataFood.length === 0) getMeals().then((data) => setDataFood(data.meals.slice(0, 12)));
  if (foodArray.length > 12) foodArray = foodArray.slice(0, 12);
  return (
    <div className="recipes-container">
      <Header>Comidas</Header>
      {listCategories(setDataFood, foodCategory, dataFoodCategories, setFoodCategory)}
      {listMeals(foodArray)}
      <Footer />
    </div>
  );
};

export default Comidas;
