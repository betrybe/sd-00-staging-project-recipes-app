import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getMealById } from '../../services/MealApi';
import AppContext from '../../context/AppContext';
import Header from './Header';
import Instruction from '../DetalhesComida/Instruction';
import Ingredients from './Ingredients';
import './index.css';

const handleProgress = (meal, setRedirect) => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const doneRecipe = [
    ...recipes,
    {
      id: meal.idMeal,
      type: 'comida',
      area: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
      doneDate: new Date(),
      tags: '',
    },
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
  setRedirect(true);
};

export default function DetalhesComida(props) {
  const { match: { params: { id } } } = props;
  const [meal, setMeal] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { recipeDone } = useContext(AppContext);
  useEffect(() => {
    getMealById(id).then((data) => setMeal(data.meals[0]));
  }, [setMeal, id]);
  if (redirect) return <Redirect to="/receitas-feitas" />;
  return (
    <div className="container">
      <Header meal={meal} />
      <Ingredients meal={meal} />
      <Instruction meal={meal} />
      <button
        disabled={!recipeDone}
        type="button"
        data-testid="finish-recipe-btn"
        className="start-recipe"
        onClick={() => handleProgress(meal, setRedirect)}
      >
        <span className="btn-text">Finalizar receita</span>
      </button>
    </div>
  );
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
};
