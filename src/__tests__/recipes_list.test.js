import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, waitFor, act } from '@testing-library/react';
import Home from '../pages/Home/Home';
import Provider from '../contexts/Provider';
import * as api from '../services/api';

const drinkCategories = Promise.resolve(require('../../cypress/mocks/drinkCategories'));
const mealCategories = Promise.resolve(require('../../cypress/mocks/mealCategories'));
export const mockSuccessFood = Promise.resolve(require('../../cypress/mocks/meals'));
export const mockSuccessDrink = Promise.resolve(require('../../cypress/mocks/drinks'));

export const fetchMock = Promise.resolve({
  json: () => mockSuccess,
});

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);
jest.spyOn(api, 'mealCategories').mockImplementation(() => mealCategories);
jest.spyOn(api, 'drinkCategories').mockImplementation(() => drinkCategories);
jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockSuccessDrink);

describe('Pagina inicial da categoria Comidas', () => {
  test('Renderiza os 12 cards', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' },
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());

    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`1-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`2-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`3-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`4-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`5-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`6-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`7-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`8-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`9-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`10-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`11-recipe-card`)).toBeInTheDocument();

    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
  });
});

describe('Ao clicar em categoria em /comidas ele deve filtrar os valores da categoria escolhida', () => {
  test('Renderiza os 12 cards da categoria e retorna ao padrão no segundo click', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' },
    );
    await waitFor(() => {
      expect(api.mealCategories).toHaveBeenCalled();
      expect(api.defaultMeals).toHaveBeenCalled();
    });

    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
    const allButton = getByTestId(/All-category-filter/);
    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();

    const beefButton = getByTestId(/Beef-category-filter/);
    const breakfastButton = getByTestId(/Breakfast-category-filter/);
    const chickenButton = getByTestId(/Chicken-category-filter/);
    const dessertButton = getByTestId(/Dessert-category-filter/);
    const goatButton = getByTestId(/Goat-category-filter/);
    expect(allButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(dessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
    expect(beefButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(beefButton);
    });
    await waitFor(() => {
      expect(api.byMealCategory).toHaveBeenCalledWith('Beef');
    });
    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`1-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`2-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`3-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`4-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`5-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`6-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`7-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`8-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`9-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`10-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`11-recipe-card`)).toBeInTheDocument();
    
    act(() => {
      fireEvent.click(beefButton);
    });
    await waitFor(() => {
      expect(api.defaultMeals).toHaveBeenCalledWith();
    });
  });


});

describe('Pagina inicial da categoria Bebidas', () => {
  test('Renderiza os 12 cards', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' },
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());

    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`1-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`2-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`3-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`4-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`5-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`6-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`7-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`8-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`9-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`10-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`11-recipe-card`)).toBeInTheDocument();

    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
  });
});

describe('Ao clicar em categoria em /bebidas ele deve filtrar os valores da categoria escolhida', () => {
  test('Renderiza os 12 cards da categoria e retorna ao padrão no segundo click', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' },
    );
    await waitFor(() => {
      expect(api.drinkCategories).toHaveBeenCalled();
      expect(api.defaultDrinks).toHaveBeenCalled();
    });

    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
    const allButton = getByTestId(/All-category-filter/);
    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();

    const ordButton = getByTestId(/Ordinary Drink-category-filter/);
    const cocktailButton = getByTestId(/Cocktail-category-filter/);
    const milkButton = getByTestId(/Milk \/ Float \/ Shake-category-filter/);
    const otherButton = getByTestId(/Other\/Unknown-category-filter/);
    const cocoaButton = getByTestId(/Cocoa-category-filter/);
    expect(allButton).toBeInTheDocument();
    expect(cocktailButton).toBeInTheDocument();
    expect(milkButton).toBeInTheDocument();
    expect(otherButton).toBeInTheDocument();
    expect(cocoaButton).toBeInTheDocument();
    expect(ordButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(ordButton);
    });
    await waitFor(() => {
      expect(api.byDrinkCategory).toHaveBeenCalledWith('Ordinary Drink');
    });

    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`1-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`2-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`3-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`4-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`5-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`6-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`7-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`8-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`9-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`10-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`11-recipe-card`)).toBeInTheDocument();

    act(() => {
      fireEvent.click(ordButton);
    });
    await waitFor(() => {
      expect(api.defaultDrinks).toHaveBeenCalledWith();
    });
  });
});

describe('Verifica se as características do card renderizam corretamente e envia para página correta em Comidas', () => {
  test('Renderiza o card e testa seu click', async () => {
    const { getByTestId, getAllByTestId, history } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' },
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());

    const card = getByTestId('0-recipe-card');

    expect(card).toBeInTheDocument();
    expect(getByTestId('0-card-img')).toBeInTheDocument();
    expect(getByTestId('0-card-name')).toBeInTheDocument();
    expect(getByTestId('0-card-name').innerHTML).toBe('Corba');

    act(() => {
      fireEvent.click(card);
    });

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/comidas/52977');
    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
  });
});

describe('Verifica se as características do card renderizam corretamente e envia para página correta em Bebidas', () => {
  test('Renderiza o card e testa seu click', async () => {
    const { getByTestId, getAllByTestId, history } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' },
    );

    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());

    const card = getByTestId('0-recipe-card');

    expect(card).toBeInTheDocument();
    expect(getByTestId('0-card-img')).toBeInTheDocument();
    expect(getByTestId('0-card-name')).toBeInTheDocument();
    expect(getByTestId('0-card-name').innerHTML).toBe('GG');

    act(() => {
      fireEvent.click(card);
    });

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/bebidas/15997');
    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
  });
});