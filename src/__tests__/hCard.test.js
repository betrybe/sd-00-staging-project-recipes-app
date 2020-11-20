import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Provider from '../contexts/Provider';
import * as api from '../services/api';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as share from '../services/share';
import HCard from '../components/HorizontalCard';

const comida = Promise.resolve(require('../../cypress/mocks/oneMeal'));
const bebida = Promise.resolve(require('../../cypress/mocks/oneDrink'));
const favRecLS = [
  {
    id: '17222',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
];
const card = {
  id: '17222',
  type: 'bebida',
  area: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'A1',
  image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
};

document.execCommand = jest.fn();

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);
jest.spyOn(api, 'byMealId').mockImplementation(() => comida);
jest.spyOn(api, 'byDrinkId').mockImplementation(() => bebida);
jest.spyOn(share, 'handleClick');
jest.spyOn(JSON, 'parse').mockImplementation(() => favRecLS);

describe('Testar a página de comidas na receitas feitas e nos favoritos', () => {
  test('Testa se a página de receitas feits renderiza com local Storage', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <HCard card={card} index={0} favOrDone="fav" />
      </Provider>,
      { route: '/receitas-favoritas' },
    );

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
    expect(cardFav).toBeInTheDocument();
    
    fireEvent.click(cardImg);
    expect(share.handleClick).toBeCalled();
  });
});
