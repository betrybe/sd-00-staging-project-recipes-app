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
import * as inProgress from '../../../services/in-progress';
/* import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; */


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
              checked={storage.checkLS(`${ingredients[index]} - ${element}`, id, history)}
              id={`${ingredients[index]} - ${element}`}
              data-testid={`${ingredients[index]} - ${element}`}
              onChange={(e) => inProgress.handleDashed(e, setUtilizados, utilizados, id, history)}
            />
            <label htmlFor={`${ingredients[index]} - ${element}`}>
              <span
                style={
                  storage.checkLS(`${ingredients[index]} - ${element}`, id, history) ? styleDash : styleNone
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
        disabled={inProgress.disabling()}
        onClick={() => inProgress.handleFinalizarReceita(history, details, Meal)}
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default ComidaInProgress;
