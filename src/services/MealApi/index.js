const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/';

export const getMeals = () => {
  const URL = `${MEAL_API}search.php?s=`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

export const getMealsByName = (name) => {
  const URL = `${MEAL_API}search.php?s=${name}`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

// getMealsByName('Lemon').then((data) => setDataFood(data))

export const getMealsByIngredients = (ingredient) => {
  const URL = `${MEAL_API}filter.php?i=${ingredient}`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

// getMealsByIngredients('Lemon').then((data) => setDataFood(data))

export const getMealsByLetter = (letter) => {
  const URL = `${MEAL_API}search.php?f=${letter}`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

// getMealsByLetter('l').then((data) => setDataFood(data))

export const getMealsByArea = (area) => {
  const URL = `${MEAL_API}filter.php?a=${area}`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

export const getMealsCategories = () => {
  const URL = `${MEAL_API}list.php?c=list`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

// getMealsCateries().then((data) => data)

export const getMealsIngredients = () => {
  const URL = `${MEAL_API}list.php?i=list`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

// getMealsIngredients().then((data) => data)

export const getMealsAreas = () => {
  const URL = `${MEAL_API}list.php?a=list`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

export const getRandomMeals = () => {
  const URL = `${MEAL_API}random.php`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

// getRandomMeals().then((data) => data)

export const getMealById = (id) => {
  const URL = `${MEAL_API}lookup.php?i=${id}`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};

export const getMealsByCategory = (category) => {
  const URL = `${MEAL_API}filter.php?c=${category}`;
  return fetch(URL).then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json)
      : Promise.reject(json))));
};
