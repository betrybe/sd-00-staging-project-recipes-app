import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Provider from '../contexts/Provider';
import * as api from '../services/api';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as share from '../services/share';
import * as inProgress from '../services/in-progress';
import ComidaInProgress from '../pages/Comidas/ComidaDetalhes/ComidaInProgress';
import ReceitasFeitas from '../pages/Perfil/ReceitasFeitas/ReceitasFeitas';
import ReceitasFavoritas from '../pages/Perfil/ReceitasFavoritas/ReceitasFavoritas';

const comida = Promise.resolve(require('../../cypress/mocks/oneMeal'));
const bebida = Promise.resolve(require('../../cypress/mocks/oneDrink'));
const doneRecLS = [
  {
    id: '17222',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: '2020-09-27T13:28:49.754Z',
    tags: [],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '2020-09-27T21:26:15.199Z',
    tags: [],
  },
];

document.execCommand = jest.fn();

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);
jest.spyOn(api, 'byMealId').mockImplementation(() => comida);
jest.spyOn(api, 'byDrinkId').mockImplementation(() => bebida);
jest.spyOn(share, 'share').mockImplementation(() => console.log('tooth'));
jest.spyOn(inProgress, 'disabling').mockImplementation(false);
jest.spyOn(localStorage, 'getItem').mockImplementation(() => doneRecLS);
jest.spyOn(JSON, 'parse').mockImplementation((e) => e);

describe('Testar a página de comidas na receitas feitas', () => {
  test('Verifica se todos elementos necessarios foram renderizados', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <ReceitasFeitas />
      </Provider>,
      { route: '/receitas-feitas' },
    );

    const allBtn = getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    const foodBtn = getByTestId('filter-by-food-btn');
    expect(foodBtn).toBeInTheDocument();
    const drinkBtn = getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    fireEvent.click(allBtn);
    fireEvent.click(foodBtn);
    fireEvent.click(drinkBtn);
  });
});

describe('Testar a página de comidas na receitas feitas', () => {
  test('Testa se a página de receitas feits renderiza com local Storage', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <ReceitasFavoritas />
      </Provider>,
      { route: '/receitas-feitas' },
    );
    const allBtn = getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    const foodBtn = getByTestId('filter-by-food-btn');
    expect(foodBtn).toBeInTheDocument();
    const drinkBtn = getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    const cardImg = await screen.findByTestId(/0-horizontal-image/i);
    const cardText = getByTestId('0-horizontal-top-text');
    const cardName = getByTestId('0-horizontal-name');
    const cardDate = getByTestId('0-horizontal-done-date');
    const cardShare = getByTestId('0-horizontal-share-btn');

    expect(cardImg).toBeInTheDocument();
    expect(cardText).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardDate).toBeInTheDocument();
    expect(cardShare).toBeInTheDocument();

    fireEvent.click(cardShare);
  });
});

describe('Testar a página de comidas na receitas feitas e nos favoritos', () => {
  test('Testa se a página de receitas feits renderiza com local Storage', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <ReceitasFavoritas />
      </Provider>,
      { route: '/receitas-favoritas' },
    );
    const allBtn = getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    const foodBtn = getByTestId('filter-by-food-btn');
    expect(foodBtn).toBeInTheDocument();
    const drinkBtn = getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    const cardImg = await screen.findByTestId(/0-horizontal-image/i);
    const cardText = getByTestId('0-horizontal-top-text');
    const cardName = getByTestId('0-horizontal-name');
    const cardDate = getByTestId('0-horizontal-done-date');
    const cardShare = getByTestId('0-horizontal-share-btn');
    const cardFav = getByTestId('0-horizontal-favorite-btn');

    expect(cardImg).toBeInTheDocument();
    expect(cardText).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardDate).toBeInTheDocument();
    expect(cardShare).toBeInTheDocument();

    fireEvent.click(cardShare);
  });
});
