import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MenuInferior from '../Components/MenuInferior';
import BarraBuscaHeader from '../Components/Barra de Busca - Header/BarraBuscaHeader';
import ListReceitas from '../Components/ListReceitas';
import ReceitasContext from '../Context/ReceitasContext';

function TemReceira(receitas, tipo, id) {
  if (!receitas) return null;
  if (receitas.length === 1) {
    return <Redirect to={`/${tipo}/${receitas[0][id]}`} />;
  } else if (receitas.length === 0) {
    return null;
  }
  return (
    <div>
      <ListReceitas />
    </div>
  );
}
export default function TelaPrincipal(props) {
  const { receitas } = useContext(ReceitasContext);
  const tipo = /comida/.test(props.match.path) ? 'comidas' : 'bebidas';
  const id = tipo === 'comidas' ? 'idMeal' : 'idDrink';
  return (
    <div>
      <BarraBuscaHeader title={tipo} />
      {TemReceira(receitas, tipo, id)}
      <MenuInferior />
    </div>
  );
}

TelaPrincipal.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
