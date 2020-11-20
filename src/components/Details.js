import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import './details.css';
import './card.css';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import goBack from '../images/go-back.svg';
import Card from './Card';
import DetailHeader from './DetailHeader';
import * as storage from '../services/localStorage';
import AppContext from '../contexts/AppContext';

const startObj = {
  cocktails: {},
  meals: {},
};

function emptyLS(history, id) {
  if (history.location.pathname.includes('bebidas')) {
    startObj.cocktails = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startObj));
  } else if (history.location.pathname.includes('comidas')) {
    startObj.meals = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startObj));
  }
}

function existingLS(history, id, LS) {
  if (history.location.pathname.includes('bebidas') && !LS.cocktails[id]) {
    const toEdit = JSON.parse(LS);
    toEdit.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  } else if (history.location.pathname.includes('comidas') && !LS.meals[id]) {
    const toEdit = JSON.parse(LS);
    toEdit.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}

function handleIniciarReceita(history, id) {
  history.push(`${history.location.pathname}/in-progress`);

  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!LS) {
    emptyLS(history, id);
  } else {
    existingLS(history, id, LS);
  }
}

function Details({ Meal, details, recom, ingredientsList }) {
  const { setLiked } = useContext(AppContext);
  const [DIS, setDIS] = useState(false);
  const [IP, setIP] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      setDIS(doneRecipes.some((data) => data.id === id));
    }

    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      if (history.location.pathname.includes('comidas')) {
        const testArr = Object.keys(inProgress.meals);
        setIP(testArr.some((data) => data === id));
      }
      if (history.location.pathname.includes('bebidas')) {
        const testArr = Object.keys(inProgress.cocktails);
        setIP(testArr.some((data) => data === id));
      }
    }
    setLiked(false);
    storage.favoriteLS(id, setLiked);
  }, []);

  return (
    <div>
      <div>
        <DetailHeader Meal={Meal} details={details} />
      </div>
      <div className="details-body">
        {ingredientsList(details)}
        <h4 className="topic-title">Instructions</h4>
        <p data-testid="instructions">{details.strInstructions}</p>
        <h4 className="topic-title">Vídeo</h4>
        <video width="300" height="240" controls>
          <source data-testid="video" src={details.strYoutube} type="video/mp4" />
        </video>
        <h4 className="topic-title">Recomendadas</h4>
        <div className="card-container">
          {recom.map((each, index) => (
            <Card
              description={Meal ? each.strDrink : each.strMeal}
              thumb={Meal ? each.strDrinkThumb : each.strMealThumb}
              id={Meal ? `bebidas ${each.idDrink}` : `comidas ${each.idMeal}`}
              i={index}
              rec
            />
          ))}
        </div>
        <button
          data-testid="start-recipe-btn"
          className={DIS ? 'hidden' : 'start-btn'}
          onClick={() => handleIniciarReceita(history, id)}
        >
          {IP ? 'Continuar Receita' : 'Iniciar receita'}
        </button>
      </div>
    </div>
  );
}

export default Details;

Details.propTypes = {
  Meal: PropTypes.bool.isRequired,
  details: PropTypes.objectOf(PropTypes.object).isRequired,
  recom: PropTypes.arrayOf(PropTypes.object).isRequired,
  ingredientsList: PropTypes.func.isRequired,
};
