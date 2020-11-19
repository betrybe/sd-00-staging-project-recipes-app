import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import * as mockAPI from '../mocks/mockAPI';
import Explorar from '../pages/Explorar/Explorar';

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de explorar', () => {
  it('Tem os data-testids explore-food e explore-drinks', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Explorar />
      </Provider>,
      { route: '/explorar' }
    );
    expect(getByTestId('explore-food')).toBeInTheDocument();
    expect(getByTestId('explore-drinks')).toBeInTheDocument();
  });
});

describe('A tela deve ter dois botões: um para explorar comidas e o outro para explorar bebidas', () => {
  it('O nomes de um dos botões deve ser "Explorar Comidas" e ele deve redirecionar para rota "/explorar/comidas"', () => {
    const { history, getByText } = renderWithRouter(
      <Provider>
        <Explorar />
      </Provider>,
      { route: '/explorar' }
    );
    
    const foodBtn = getByText(/Explorar Comidas/i);
    expect(foodBtn).toBeInTheDocument();
    fireEvent.click(foodBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas');
  });
  it('O nomes de um dos botões deve ser "Explorar Bebidas" e ele deve redirecionar para rota "/explorar/bebidas"', () => {
    const { history, getByText } = renderWithRouter(
      <Provider>
        <Explorar />
      </Provider>,
      { route: '/explorar' }
    );
    
    const drinkBtn = getByText(/Explorar bebidas/i);
    expect(drinkBtn).toBeInTheDocument();
    fireEvent.click(drinkBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
