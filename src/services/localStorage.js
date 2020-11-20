export function favoriteLS(id, setLiked) {
  const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favLS) {
    const teste = favLS.some((data) => data.id === id);
    if (teste) {
      setLiked(true);
    }
  }
}

export function starterLS(history, id, LS) {
  let historico = [];
  if (LS && history.location.pathname.includes('comidas')) {
    historico = LS.meals[id];
  } else if (LS && history.location.pathname.includes('bebidas')) {
    historico = LS.cocktails[id];
  }
  return historico;
}

export function inProgressLS(id, history) {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const starterObj = {
    cocktails: {},
    meals: {},
  };

  const LSIP = localStorage.getItem('inProgressRecipes');
  if (!LSIP && history.location.pathname.includes('bebidas')) {
    starterObj.cocktails = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(starterObj));
  } else if (!LSIP && history.location.pathname.includes('comidas')) {
    starterObj.meals = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(starterObj));
  } else if (LSIP && history.location.pathname.includes('bebidas')) {
    const historico = starterLS(history, id, LS);
    const toEdit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    toEdit.cocktails[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  } else if (LSIP && history.location.pathname.includes('comidas')) {
    const historic = starterLS(history, id, LS);
    const toEdit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    toEdit.meals[id] = historic;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}

export function mealObj(details) {
  return {
    id: details.idMeal,
    type: 'comida',
    area: details.strArea,
    category: details.strCategory,
    alcoholicOrNot: '',
    name: details.strMeal,
    image: details.strMealThumb,
  };
}

export function drinkObj(details) {
  return {
    id: details.idDrink,
    type: 'bebida',
    area: '',
    category: details.strCategory,
    alcoholicOrNot: details.strAlcoholic,
    name: details.strDrink,
    image: details.strDrinkThumb,
  };
}

export function setNewFavLS(Meal, details) {
  const newFav = Meal ? mealObj(details) : drinkObj(details);
  const historico = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!historico) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFav]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...historico, newFav]));
  }
}

export function setDoneLS(Meal, details) {
  const newFavo = Meal ? mealObj(details) : drinkObj(details);
  newFavo.doneDate = new Date();
  newFavo.tags = details.strTags ? details.strTags.split(',') : [];
  const historico = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!historico) {
    localStorage.setItem('doneRecipes', JSON.stringify([newFavo]));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([...historico, newFavo]));
  }
}

export function removeIPLS(Meal, details) {
  const historico = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (Meal) {
    delete historico.meals[details.idMeal];
  } else {
    delete historico.cocktails[details.idDrink];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(historico));
}

export function removeFavLS(Meal, details) {
  const hist = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let removed;
  if (Meal) {
    removed = hist.filter((each) => each.id !== details.idMeal);
  } else {
    removed = hist.filter((each) => each.id !== details.idDrink);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
}

export function checkLS(str, id, history) {
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
