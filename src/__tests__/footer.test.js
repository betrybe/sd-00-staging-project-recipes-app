import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Footer from '../components/Footer';

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para o menu inferior disponível na tela principal de receitas', () => {
  it('Tem os data-testids footer, drinks-bottom-btn, explore-bottom-btn e food-bottom-btn', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Footer />
      </Provider>,
      { route: '/comidas' }
    );
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});

// describe('Deve ser fixo e apresentar 3 ícones: um para comidas, um para bebidas e outro para exploração', () => {
//   it('O menu inferior deve ficar fixado sempre ao final da página', () => {
//     const { getByTestId } = renderWithRouter(
//       <Provider>
//         <Footer />
//       </Provider>,
//       { route: '/comidas' }
//     );
//     expect(getByTestId('footer')).toHaveAttribute('style', { position: 'fixed' });
//   });

//   it('Apresenta os ícones corretos', () => {
//     const { getByTestId, getByAltText } = renderWithRouter(
//       <Provider>
//         <Footer />
//       </Provider>,
//       { route: '/comidas' }
//     );
//     expect(getByTestId('drink-bottom-btn')).toHaveAttribute('src');
//     expect(getByAltText('drinks')).toBeInTheDocument();
//     expect(getByTestId('explore-bottom-btn')).toHaveAttribute('src');
//     expect(getByAltText('explorar')).toBeInTheDocument();
//     expect(getByTestId('food-bottom-btn')).toHaveAttribute('src');
//     expect(getByAltText('comidas')).toBeInTheDocument();
//   });
// });

describe('Ao clicar no ícone de bebidas, a pessoa deve ser redirecionada para uma lista de cocktails', () => {
  it('Redireciona para a rota correta', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Footer />
      </Provider>,
      { route: '/comidas' }
    );
    const drinksBtn = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas');
  });
});

describe('Ao clicar no ícone de exploração, a rota deve mudar para a tela de explorar', () => {
  it('Redireciona para a rota correta', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Footer />
      </Provider>,
      { route: '/comidas' }
    );
    const exploreBtn = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar');
  });
});

describe('Ao clicar no ícone de comidas, a pessoa deve ser redirecionada para uma lista de comidas', () => {
  it('Redireciona para a rota correta', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Footer />
      </Provider>,
      { route: '/bebidas' }
    );
    const comidasBtn = getByTestId('food-bottom-btn');
    fireEvent.click(comidasBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });
});