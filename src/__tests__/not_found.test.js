import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import NotFound from '../components/NotFound';

describe('Deve ter uma página de Not Found caso o usuário tente um link não existente', () => {
  it('Tem um texto informando não ter sido encontrado e uma img', () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <NotFound />
      </Provider>,
      { route: '/explorar/bebidas/area' }
    );

    expect(getByText(/Sorry, Not Found/i)).toBeInTheDocument();
  });
});


// jest.useFakeTimers();

// describe('Deve redirecionar a página', () => {
//   it('Redireciona a página para a home depois de 30 segundos', () => {
//     const { history } = renderWithRouter(
//       <Provider>
//         <NotFound />
//       </Provider>,
//       { route: '/explorar/bebidas/area' }
//     );
//     const timerGame = require('./mockTime');
//     timerGame(history);

//     expect(setTimeout).toHaveBeenCalled();
//     expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 30000);
//     const {
//       location : {
//         pathname
//       }
//     } = history;
//     expect(pathname).toBe('/comidas');
//   })
// })