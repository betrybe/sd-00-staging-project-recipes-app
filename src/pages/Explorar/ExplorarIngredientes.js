import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import AppContext from '../../contexts/AppContext';
import * as api from '../../services/api';

const urlMeal = (item) =>
  `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`;
const urlDrink = (item) =>
  `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png`;

function IngCards(Meal, list, clickIng) {
  return (
    <div className="d-flex flex-row flex-wrap justify-content-around">
      {list
        .filter((ing, i) => i < 12)
        .map((item, i) => (
          <button
            key={Meal ? item.strIngredient : item.strIngredient1}
            onClick={() => clickIng(item)}
            data-testid={`${i}-ingredient-card`}
            className="card-rec"
          >
            <div className="card">
              <img
                src={Meal ? urlMeal(item) : urlDrink(item)}
                alt={Meal ? item.strIngredient : item.strIngredient1}
                className="card-image-top"
                data-testid={`${i}-card-img`}
              />
              <div className="card-body card-description">
                <p data-testid={`${i}-card-name`}>
                  {Meal ? item.strIngredient : item.strIngredient1}
                </p>
              </div>
            </div>
          </button>
        ))}
    </div>
  );
}

export default function ExplorarIngredientes() {
  const history = useHistory();
  const { setFilteredData, Meal, setMeal } = useContext(AppContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (history.location.pathname === '/explorar/comidas/ingredientes') {
      api.mealListIng().then((data) => setList(data.meals));
      setMeal(true);
    }
    if (history.location.pathname === '/explorar/bebidas/ingredientes') {
      api.drinkListIng().then((data) => setList(data.drinks));
      setMeal(false);
    }
  }, []);

  const clickIng = async (ing) => {
    if (Meal) {
      api.byMealIngredient(ing.strIngredient).then((data) => {
        setFilteredData(data.meals);
        history.push('/comidas');
      });
    } else {
      api.byDrinkIngredient(ing.strIngredient1).then((data) => setFilteredData(data.drinks));
      history.push('/bebidas');
    }
  };
  if (list.length === 0) return <Loading />;
  return (
    <div>
      <Header />
      {IngCards(Meal, list, clickIng)}
      <Footer />
    </div>
  );
}
