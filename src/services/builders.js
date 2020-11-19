import * as api from './api';

export function quantityBuilder(details) {
  const result = [];
  Object.entries(details).forEach((element) => {
    if (element[0].includes('strMeasure') && element[1] && element[1] !== ' ') {
      result.push(element[1]);
    }
  });
  return result;
}

export function ingredientBuilder(details) {
  const result = [];
  Object.entries(details).forEach((element) => {
    if (element[0].includes('strIngredient') && element[1] && element[1] !== ' ') {
      result.push(element[1]);
    }
  });
  return result;
}

export function inProgressBuilder(history, setLoading, setDetails, id, setMeal) {
  if (history.location.pathname.includes('comidas')) {
    setLoading(true);
    api.byMealId(id).then((data) => {
      setDetails(data.meals[0]);
      setLoading(false);
    });
    setMeal(true);
  }
  if (history.location.pathname.includes('bebidas')) {
    api.byDrinkId(id).then((data) => {
      setDetails(data.drinks[0]);
      setMeal(false);
    });
  }
}
