import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getRandomMeals as fetchMeal } from '../../services/MealApi';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

const getRandomMeal = (setRedirect, setRedirectId) => {
  fetchMeal().then(({ meals }) => {
    console.log(meals[0]);
    setRedirectId(meals[0].idMeal);
    setRedirect(true);
  });
};

const ExplorarComidas = () => {
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState();
  return redirect ? (
    <Redirect to={`/comidas/${id}`} />
  ) : (
    <div>
      <Header hideSearch>Explorar Comidas</Header>
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area" type="button">
          Por Local de Origem
        </button>
      </Link>
      <button
        onClick={() => getRandomMeal(setRedirect, setId)}
        data-testid="explore-surprise"
        type="button"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
};

export default ExplorarComidas;
