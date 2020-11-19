import React from 'react';
import { waitFor, fireEvent, getByText } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import ExplorarComOuBeb from '../pages/Explorar/ExplorarComOuBeb';


describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de explorar bebidas ou comidas', () => {
  it('Tem os data-testids corretos para a tela de explorar comidas', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/comidas' }
    );

    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-by-area')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
  });

  it('Tem os data-testids corretos para a tela de explorar comidas', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/bebidas' }
    );

    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(queryByTestId('explore-by-area')).not.toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
  });
});

describe('A tela deve ter três botões: um para explorar por ingrediente, um para explorar por local de origem e um para pegar uma receita aleatória', () => {
  it('Tem os botões "Por Ingredientes", "Por Local de Origem" e "Me Surpreenda!" para a tela de explorar comidas', () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/comidas' }
    );

    const ingBtn = getByText(/Por Ingredientes/i);
    const areaBtn = getByText(/Por Local de Origem/i);
    const surpBtn = getByText(/Me Surpreenda!/i);
    expect(ingBtn).toBeInTheDocument();
    expect(areaBtn).toBeInTheDocument();
    expect(surpBtn).toBeInTheDocument();
  });

  it('Tem apenas os botões "Por Ingredientes" e "Me Surpreenda!" para a tela de explorar bebidas', () => {
    const { getByText, queryByText } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/bebidas' }
    );

    const ingBtn = getByText(/Por Ingredientes/i);
    const areaBtn = queryByText(/Por Local de Origem/i);
    const surpBtn = getByText(/Me Surpreenda!/i);
    expect(ingBtn).toBeInTheDocument();
    expect(areaBtn).not.toBeInTheDocument();
    expect(surpBtn).toBeInTheDocument();
  });
});

describe('Ao clicar em "Por Ingredientes", a rota deve mudar para tela de explorar ingredientes', () => {
  it('Ao clicar no botão "Por Ingredientes" da tela de explorar comidas a rota muda para a página de explorar comidas por ingrediente', () => {
    const { history, getByText } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/comidas' }
    );

    const ingBtn = getByText(/Por Ingredientes/i);
    fireEvent.click(ingBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Ao clicar no botão "Explorar Bebidas" da tela de explorar bebidas a rota muda para a página de explorar bebidas por ingrediente', () => {
    const { history, getByText } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/bebidas' }
    );

    const ingBtn = getByText(/Por Ingredientes/i);
    fireEvent.click(ingBtn);
    const { location: { pathname }} = history;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
});

describe('Ao clicar em "Por Local de Origem", a rota deve mudar para tela de explorar por local de origem', () => {
  it('A rota deve mudar para tela de explorar por local de origem', () => {
    const { history, getByText } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/comidas' }
    );

    const areaBtn = getByText(/Por Local de Origem/i);;
    fireEvent.click(areaBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas/area')
  });
});

const randMeal = Promise.resolve(require('../../cypress/mocks/oneMeal'));
jest.spyOn(api, 'mealRandom').mockImplementation(() => randMeal);
const randDrink = Promise.resolve(require('../../cypress/mocks/oneDrink'));
jest.spyOn(api, 'drinkRandom').mockImplementation(() => randDrink);

describe('Ao clicar em "Me Surpreenda!", a rota deve mudar para a tela de detalhes de uma receita, que deve ser escolhida de forma aleatória', () => {
  it('Ao clicar no botão "Me Surpreenda" da tela de explorar comidas a rota muda para a página de detalhes de uma comida aleatória', async () => {
    const { history, getByText, getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/comidas' }
    );
    
    const surpBtn = getByText(/Me Surpreenda!/i);
    fireEvent.click(surpBtn);
    await waitFor(() => expect(api.mealRandom).toHaveBeenCalled());
    const meal = require('../../cypress/mocks/oneMeal').meals;
    const {location: {pathname}} = history;
    expect(pathname).toBe(`/comidas/${meal[0].idMeal}`);
  });
  it('Ao clicar no botão "Explorar Bebidas" da tela de explorar bebidas a rota muda para a página de detalhes de uma bebida aleatória', async () => {
    const { history, getByText } = renderWithRouter(
      <Provider>
        <ExplorarComOuBeb />
      </Provider>,
      { route: '/explorar/bebidas' }
    );

    const surpBtn = getByText(/Me Surpreenda!/i);
    fireEvent.click(surpBtn);
    await waitFor(() => expect(api.drinkRandom).toHaveBeenCalled());
    const drink = require('../../cypress/mocks/oneDrink').drinks;
    const {location: {pathname}} = history;
    expect(pathname).toBe(`/bebidas/${drink[0].idDrink}`);
  });
});
