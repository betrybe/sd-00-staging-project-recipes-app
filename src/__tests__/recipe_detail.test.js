import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, waitFor } from '@testing-library/react';
import Provider from '../contexts/Provider';
import Details from '../pages/Comidas/ComidaDetalhes/ComidaDetalhes';
import * as api from '../services/api';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as share from '../services/share';

const comida = Promise.resolve(require('../../cypress/mocks/oneMeal'));
const bebida = Promise.resolve(require('../../cypress/mocks/oneDrink'));

document.execCommand = jest.fn();

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);
jest.spyOn(api, 'byMealId').mockImplementation(() => comida);
jest.spyOn(api, 'byDrinkId').mockImplementation(() => bebida);
jest.spyOn(share, 'share');

describe('Pagina de detalhes de Comidas', () => {
  test('Verifica se todos elementos necessarios foram renderizados', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Details />
      </Provider>,
      { route: '/comidas/52771' },
    );
    await waitFor(() => {
      expect(api.defaultDrinks).toHaveBeenCalled();
      expect(api.byMealId).toHaveBeenCalled();
    });

    const photo = getByTestId('recipe-photo');
    const title = getByTestId('recipe-title');
    const category = getByTestId('recipe-category');
    const favorite = getByTestId('favorite-btn');
    const sharebt = getByTestId('share-btn');
    const instructions = getByTestId('instructions');
    const video = getByTestId('video');
    const rec1Image = getByTestId('0-recomendation-img');
    const rec2Image = getByTestId('1-recomendation-img');
    const rec1Title = getByTestId('0-recomendation-title');
    const rec2Title = getByTestId('1-recomendation-title');
    const startButton = getByTestId('start-recipe-btn');

    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(sharebt).toBeInTheDocument();
    expect(rec1Image).toBeInTheDocument();
    expect(rec2Image).toBeInTheDocument();
    expect(rec1Title).toBeInTheDocument();
    expect(rec2Title).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();

    fireEvent.click(sharebt);
    expect(share.share).toHaveBeenCalled();
    fireEvent.click(sharebt);
    expect(share.share).toHaveBeenCalled();
    fireEvent.click(favorite);
  });
});

describe('Pagina de detalhes de Bebidas', () => {
  test('Verifica se todos elementos necessarios foram renderizados', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <Details />
      </Provider>,
      { route: '/bebidas/178319' },
    );

    await waitFor(() => {
      expect(api.byDrinkId).toHaveBeenCalled();
    });
    expect(api.defaultDrinks).toHaveBeenCalled();

    const photo = getByTestId('recipe-photo');
    const title = getByTestId('recipe-title');
    const category = getByTestId('recipe-category');
    const favorite = getByTestId('favorite-btn');
    const sharebt = getByTestId('share-btn');
    const instructions = getByTestId('instructions');
    const video = getByTestId('video');
    const rec1Image = getByTestId('0-recomendation-img');
    const rec2Image = getByTestId('1-recomendation-img');
    const rec1Title = getByTestId('0-recomendation-title');
    const rec2Title = getByTestId('1-recomendation-title');
    const startButton = getByTestId('start-recipe-btn');
    
    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(sharebt).toBeInTheDocument();
    expect(rec1Image).toBeInTheDocument();
    expect(rec2Image).toBeInTheDocument();
    expect(rec1Title).toBeInTheDocument();
    expect(rec2Title).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();

    fireEvent.click(sharebt);
    expect(share.share).toHaveBeenCalled();
    fireEvent.click(favorite);
  });
});
