import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import ExplorarIngredientes from '../pages/Explorar/ExplorarIngredientes';

const listMealIng = Promise.resolve(require('../../cypress/mocks/mealIngredients'));
jest.spyOn(api, 'mealListIng').mockImplementation(() => listMealIng);
const listDrinkIng = Promise.resolve(require('../../cypress/mocks/drinkIngredients'));
jest.spyOn(api, 'drinkListIng').mockImplementation(() => listDrinkIng);
const mealsByIng = Promise.resolve(require('../../cypress/mocks/mealsByIngredient'));
jest.spyOn(api, 'byMealIngredient').mockImplementation(() => mealsByIng);
const drinksByIng = Promise.resolve(require('../../cypress/mocks/drinksByIngredient'));
jest.spyOn(api, 'byDrinkIngredient').mockImplementation(() => drinksByIng);

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de explorar ingredientes', () => {
  it('Tem os data-testids corretos para a tela de explorar comidas por ingredientes', async () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <ExplorarIngredientes />
      </Provider>,
      { route: '/explorar/comidas/ingredientes' }
    );
    await waitFor(() => expect(api.mealListIng).toHaveBeenCalled());
    const ingredientsList = require('../../cypress/mocks/mealIngredients');
    ingredientsList.meals.filter((ing, i) => i < 12).forEach((ing, i) => {
      expect(getByTestId(`${i}-ingredient-card`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-img`)).toHaveAttribute('src', `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png`);
      expect(getByAltText(ing.strIngredient)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-name`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-name`).innerHTML).toBe(ing.strIngredient);
    })
  });

  it('Tem os data-testids corretos para a tela de explorar bebidas por ingredientes', async () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <ExplorarIngredientes />
      </Provider>,
      { route: '/explorar/bebidas/ingredientes' }
    );
    await waitFor(() => expect(api.drinkListIng).toHaveBeenCalled());
    const ingredientsList = require('../../cypress/mocks/drinkIngredients');
    ingredientsList.drinks.filter((ing, i) => i < 12).forEach((ing, i) => {
      expect(getByTestId(`${i}-ingredient-card`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-img`)).toHaveAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png`);
      expect(getByAltText(ing.strIngredient1)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-name`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-name`).innerHTML).toBe(ing.strIngredient1);
    })
  });
});

describe('Ao clicar no card do ingrediente a rota deve mudar para tela principal de receitas, mas mostrando apenas as receitas que contém o ingrediente escolhido', () => {
  it('Ao clicar no card do ingrediente da tela de explorar comidas por ingrediente a rota muda para a tela principal de receitas filtrada pelo ingrediente', async () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarIngredientes />
      </Provider>,
      { route: '/explorar/comidas/ingredientes' }
    );
    await waitFor(() => expect(api.mealListIng).toHaveBeenCalled());

    const chickenCard = getByTestId('0-ingredient-card');
    fireEvent.click(chickenCard);

    await waitFor(() => expect(api.byMealIngredient).toHaveBeenCalled());
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });

  it('Ao clicar no card do ingrediente da tela de explorar bebidas por ingrediente a rota muda para a tela principal de receitas filtrada pelo ingrediente', async () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarIngredientes />
      </Provider>,
      { route: '/explorar/bebidas/ingredientes' }
    );
    await waitFor(() => expect(api.drinkListIng).toHaveBeenCalled());

    const lightRumCard = getByTestId('0-ingredient-card');
    fireEvent.click(lightRumCard);

    await waitFor(() => expect(api.byDrinkIngredient).toHaveBeenCalled());
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas');
  });
});