import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getRandomDrinks as fetchDrink } from '../../services/DrinkApi';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

const getRandomDrink = (setRedirect, setRedirectId) => {
  fetchDrink().then(({ drinks }) => {
    console.log(drinks[0]);
    setRedirectId(drinks[0].idDrink);
    setRedirect(true);
  });
};

const ExplorarBebidas = () => {
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState();
  return redirect ? (
    <Redirect to={`/bebidas/${id}`} />
  ) : (
    <div>
      <Header hideSearch>Explorar Bebidas</Header>
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <button
        onClick={() => getRandomDrink(setRedirect, setId)}
        data-testid="explore-surprise"
        type="button"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
};

export default ExplorarBebidas;
