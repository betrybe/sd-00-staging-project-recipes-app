import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import BarraBuscaHeader from '../Components/Barra de Busca - Header/BarraBuscaHeader';

export default function TelaExplorarLocal() {
  return (
    <div>
      <BarraBuscaHeader title={'Explorar Origem'} />
      <MenuInferior />
    </div>
  );
}
