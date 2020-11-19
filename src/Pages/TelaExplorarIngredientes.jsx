import React from 'react';
import PropTypes from 'prop-types';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';

export default function TelaExplorarIngredientes(props) {
  return (/comidas/).test(props.match.path) ?
  (
    <div>
      <BarraHeader title={'Explorar Ingredientes'} showTop="true" />
      <MenuInferior />
    </div>
  )
  :
  (
    <div>
      <BarraHeader title={'Explorar Ingredientes'} showTop="true" />
      <MenuInferior />
    </div>
  );
}

TelaExplorarIngredientes.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
