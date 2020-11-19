import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import * as storage from '../../../services/localStorage';
import AppContext from '../../../contexts/AppContext';
import './style.css';
import '../../../components/details.css';
import DetailHeader from '../../../components/DetailHeader';
import * as builder from '../../../services/builders';
import Loading from '../../../components/Loading';
/* import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; */

function disabling() {
  let disabled = true;
  let checked = 0;
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.checked ? (checked += 1) : 0));
  if (checked > 0 && checked === inputs.length) {
    disabled = false;
  }
  return disabled;
}

function handleFinalizarReceita(history, details, Meal) {
  history.push('/receitas-feitas');
  storage.removeIPLS(Meal, details);
  storage.setDoneLS(Meal, details);
}

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};

const styleDash = {
  textDecoration: 'line-through',
};
const styleNone = {
  textDecoration: 'none',
};

function checkLS(str, id, history) {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!LS) {
    return false;
  }
  if (LS.meals[id] && history.location.pathname.includes('comidas')) {
    const newCheck = LS.meals[id].some((each) => each === str);
    return newCheck;
  } else if (LS.cocktails[id] && history.location.pathname.includes('bebidas')) {
    const newCheck = LS.cocktails[id].some((each) => each === str);
    return newCheck;
  }
  return false;
}

function isChecked(setUtilizados, utilizados, history, id, e) {
  const line = document.getElementsByClassName(`${e.target.id}`)[0];
  line.style.textDecoration = 'line-through';
  setUtilizados([...utilizados, e.target.id]);
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    LS.meals[id] = [...utilizados, e.target.id];
  } else if (history.location.pathname.includes('bebidas')) {
    LS.cocktails[id] = [...utilizados, e.target.id];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
}

function notChecked(setUtilizados, utilizados, history, id, e) {
  const line1 = document.getElementsByClassName(`${e.target.id}`)[0];
  line1.style.textDecoration = 'none';
  const newArr = utilizados.filter((data) => data !== e.target.id);
  setUtilizados(newArr);
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    LS.meals[id] = newArr;
  } else if (history.location.pathname.includes('bebidas')) {
    LS.cocktails[id] = newArr;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
}

function handleDashed(e, setUtilizados, utilizados, id, history) {
  if (e.target.checked) {
    isChecked(setUtilizados, utilizados, history, id, e);
  } else {
    notChecked(setUtilizados, utilizados, history, id, e);
  }
}

function ingredientsList(details, setUtilizados, utilizados, id, history) {
  const quantities = builder.quantityBuilder(details);
  const ingredients = builder.ingredientBuilder(details);

  return (
    <div>
      <h4 className="topic-title">Ingredients</h4>
      <ul>
        {quantities.map((element, index) => (
          <li className="prog-list" data-testid={`${index}-ingredient-step`}>
            <input
              type="checkbox"
              checked={checkLS(`${ingredients[index]} - ${element}`, id, history)}
              id={`${ingredients[index]} - ${element}`}
              onChange={(e) => handleDashed(e, setUtilizados, utilizados, id, history)}
            />
            <label htmlFor={`${ingredients[index]} - ${element}`}>
              <span
                style={
                  checkLS(`${ingredients[index]} - ${element}`, id, history) ? styleDash : styleNone
                }
                className={`${ingredients[index]} - ${element} ing`}
              >
                {ingredients[index]} - {element}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComidaInProgress() {
  const { loading, setLoading, details, setDetails, setLiked, Meal, setMeal } = useContext(
    AppContext,
  );
  const history = useHistory();
  const { id } = useParams();
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const historico = storage.starterLS(history, id, LS);
  let initialState;
  if (historico) {
    initialState = historico;
  } else {
    initialState = [];
  }
  const [utilizados, setUtilizados] = useState(initialState);

  useEffect(() => {
    builder.inProgressBuilder(history, setLoading, setDetails, id, setMeal);
  }, [id]);

  useEffect(() => {
    storage.inProgressLS(id, history);
    storage.favoriteLS(id, setLiked);
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div>
        <DetailHeader Meal={Meal} details={details} />
      </div>
      <div className="details-body">
        {ingredientsList(details, setUtilizados, utilizados, id, history)}
        <h4 className="topic-title">Instructions</h4>
        <p data-testid="instructions">{details.strInstructions}</p>
      </div>
      <button
        className="start-btn"
        style={style}
        data-testid="finish-recipe-btn"
        disabled={disabling()}
        onClick={() => handleFinalizarReceita(history, details, Meal)}
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default ComidaInProgress;
