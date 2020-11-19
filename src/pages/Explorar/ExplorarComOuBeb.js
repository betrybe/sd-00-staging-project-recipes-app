import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AppContext from '../../contexts/AppContext';
import * as api from '../../services/api';

const typeOfExplore = [
  { datatId: 'explore-by-ingredient', name: 'ingredientes', text: 'Por Ingredientes' },
  { datatId: 'explore-by-area', name: 'area', text: 'Por Local de Origem' },
  { datatId: 'explore-surprise', name: 'surprise', text: 'Me Surpreenda!' },
];

const getRandom = (local, history, setDetails) => {
  if (local === 'comidas') {
    api.mealRandom().then((data) => {
      setDetails(data.meals[0]);
      history.push(`/comidas/${data.meals[0].idMeal}`);
    });
  }
  if (local === 'bebidas') {
    api.drinkRandom().then((data) => {
      setDetails(data.drinks[0]);
      history.push(`/bebidas/${data.drinks[0].idDrink}`);
    });
  }
};

export default function ExplorarComOuBeb() {
  const history = useHistory();
  const { setDetails } = useContext(AppContext);
  const [local, setLocal] = useState();
  const [btns, setBtns] = useState(typeOfExplore);
  useEffect(() => {
    if (history.location.pathname === '/explorar/comidas') {
      setLocal('comidas');
    }
    if (history.location.pathname === '/explorar/bebidas') {
      setLocal('bebidas');
      setBtns(typeOfExplore.filter((topic) => topic.name !== 'area'));
    }
  }, []);

  const handleClick = (name) => {
    if (name === 'ingredientes') {
      history.push(`/explorar/${local}/${name}`);
    } else if (name === 'area') {
      history.push(`/explorar/comidas/${name}`);
    } else if (name === 'surprise') {
      getRandom(local, history, setDetails);
    }
  };

  return (
    <div>
      <Header />
      <div className="btn-container">
        {btns.map((topic) => (
          <button
            key={topic.name}
            data-testid={topic.datatId}
            className="btn"
            onClick={() => handleClick(topic.name)}
          >
            {topic.text}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
