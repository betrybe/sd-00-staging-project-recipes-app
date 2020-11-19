import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import AppContext from '../../context/AppContext';
import { getMealsIngredients, getMealsByIngredients } from '../../services/MealApi';

import './index.css';

const ExplorarIngredientesMeals = () => {
  const [ingArray, setIngArray] = useState([]);
  const [redirect, setRed] = useState(false);
  const { setDataFood } = useContext(AppContext);

  const clickOn = (ingrediente) => {
    getMealsByIngredients(ingrediente).then((data) => {
      setDataFood(data.meals);
      setRed(true);
    });
  };

  const listIngredients = () => ingArray.map((ingrediente, index) => (
    <button
      type="button"
      className="recipe-card"
      key={ingrediente.strIngredient}
      data-testid={`${index}-ingredient-card`}
      onClick={() => clickOn(ingrediente.strIngredient)}
    >
      <img
        className="thumbnail"
        data-testid={`${index}-card-img`}
        src={`https://www.themealdb.com/images/ingredients/${ingrediente.strIngredient}-Small.png`}
        alt="thumbnail do ingrediente"
      />
      <p data-testid={`${index}-card-name`}>{ingrediente.strIngredient}</p>
    </button>
  ));
  useEffect(() => {
    getMealsIngredients().then((data) => setIngArray(data.meals));
  }, []);

  if (ingArray.length > 12) setIngArray(ingArray.slice(0, 12));
  if (redirect) return <Redirect to="/comidas" />;

  return (
    <div className="recipes-container">
      <Header hideSearch>Explorar Ingredientes</Header>
      {listIngredients(ingArray)}
      <Footer />
    </div>
  );
};

export default ExplorarIngredientesMeals;
