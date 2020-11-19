import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import '../../../components/details.css';
import * as api from '../../../services/api';
import AppContext from '../../../contexts/AppContext';
import Details from '../../../components/Details';
import Loading from '../../../components/Loading';
import * as builder from '../../../services/builders';
/* import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; */

function ingredientsList(details) {
  const quantities = builder.quantityBuilder(details);
  const ingredients = builder.ingredientBuilder(details);

  return (
    <div className="topic-container">
      <h4 className="topic-title">Ingredients</h4>
      <div className="list-container">
        <ul>
          {quantities.map((element, index) => (
            <li data-testid={`${index}-ingredient-name-and-measure`}>
              {ingredients[index]} - {element}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ComidaDetalhes() {
  const { loading, setLoading, details, setDetails, Meal, setMeal } = useContext(AppContext);
  const [recom, setRecom] = useState([]);
  const {
    location: { pathname },
  } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      setLoading(true);
      api.byMealId(id).then((data) => {
        setDetails(data.meals[0]);
        setLoading(false);
      });
      api.defaultDrinks().then((data) => {
        setRecom(data.drinks.slice(0, 6));
      });
      setMeal(true);
    }
    if (pathname.includes('bebidas')) {
      setLoading(true);
      api.byDrinkId(id).then((data) => {
        setDetails(data.drinks[0]);
        setLoading(false);
      });
      api.defaultMeals().then((data) => {
        setRecom(data.meals.slice(0, 6));
      });
      setMeal(false);
    }
  }, [id]);

  if (loading) return <Loading />;
  return <Details details={details} Meal={Meal} recom={recom} ingredientsList={ingredientsList} />;
}

export default ComidaDetalhes;
