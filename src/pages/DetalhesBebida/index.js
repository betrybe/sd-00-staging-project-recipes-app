import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMeals } from '../../services/MealApi';
import { getDrinkById } from '../../services/DrinkApi';
import AppContext from '../../context/AppContext';
import Header from './Header';
import Instruction from './Instruction';
import Recommend from './Recommend';
import Ingredients from './Ingredients';
import './index.css';

const handleProgress = (id) => {
  const store = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: { [id]: [] },
    meals: {},
  };
  if (!store.cocktails[id]) {
    const inProgressRecipe = { ...store, cocktails: { ...store.cocktails, [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify(store));
  }
};

export default function DetalhesBebidas(props) {
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState({});
  const [receipDone, setRecipeDone] = useState(false);
  const { receipProgress, setReceipProgress } = useContext(AppContext);
  useEffect(() => {
    getDrinkById(id).then((data) => setDrink(data.drinks[0]));
  }, [setDrink, id]);
  const [meal, setmeal] = useState([]);
  useEffect(() => {
    getMeals().then((data) => setmeal(data.meals.slice(0, 6)));
  }, [setmeal]);
  useEffect(() => {
    const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const itemDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (itemProgress !== null && itemProgress.cocktails !== undefined) {
      const progress = Object.keys(itemProgress.cocktails);
      setReceipProgress(progress[0] === drink.idDrink);
    }
    if (itemDone !== null) {
      setRecipeDone(itemDone.some((el) => el.id === drink.idDrink));
    }
  }, [setReceipProgress, drink]);
  return (
    <div className="container">
      <Header Drink={drink} />
      <Ingredients Drink={drink} />
      <Instruction Drink={drink} />
      <Recommend meal={meal} />
      {!receipDone && (
        <Link className="start-recipe" to={`/bebidas/${drink.idDrink}/in-progress`}>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe"
            onClick={() => handleProgress(drink.idDrink)}
          >
            <span className="btn-text">
              {!receipProgress ? 'Iniciar Receita' : 'Continuar Receita'}
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
};
