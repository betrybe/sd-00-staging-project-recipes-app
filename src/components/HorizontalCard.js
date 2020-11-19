import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareI from '../images/shareIcon.svg';
import blackHI from '../images/blackHeartIcon.svg';
import AppContext from '../contexts/AppContext';
import * as fn from '../services/share';

function shareBt(id, type, setCopiado) {
  let linkToCopy;
  if (type === 'comida') {
    linkToCopy = `http://localhost:3000/comidas/${id}`;
  } else {
    linkToCopy = `http://localhost:3000/bebidas/${id}`;
  }
  const textCopy = document.createElement('textarea');
  textCopy.innerText = linkToCopy;
  document.body.appendChild(textCopy);
  textCopy.select();
  document.execCommand('copy');
  textCopy.remove();

  setCopiado(true);
  setTimeout(() => {
    setCopiado(false);
  }, 5000);
}

function disFav(id, type, setFav) {
  const histo = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let removing;
  if (type === 'comida') {
    removing = histo.filter((each) => each.id !== id);
  } else {
    removing = histo.filter((each) => each.id !== id);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(removing));
  setFav(true);
  setTimeout(() => {
    setFav(false);
  }, 5000);
}

function HCard({ card, index, favOrDone }) {
  const { setFav } = useContext(AppContext);
  const history = useHistory();
  const [copiado, setCopiado] = useState(false);

  return (
    <button className="card-rec">
      <div className="card">
        <button onClick={() => fn.handleClick(history, card.type, card.id)}>
          <img
            src={card.image}
            alt={card.name}
            className="card-image-top"
            data-testid={`${index}-horizontal-image`}
          />
        </button>
        <div className="card-body card-description">
          <p
            className="card-title d-flex flex-column justify-content-end align-items-center"
            data-testid={`${index}-horizontal-top-text`}
          >
            {`${card.type === 'bebida' ? card.alcoholicOrNot : card.area} - ${card.category}`}
          </p>
          <button onClick={() => fn.handleClick(history, card.type, card.id)}>
            <p data-testid={`${index}-horizontal-name`}>{card.name}</p>
          </button>
          <p data-testid={`${index}-horizontal-done-date`}>{card.doneDate}</p>
          {favOrDone === 'done' && (
            <p>
              {card.tags.map((each) => (
                <span data-testid={`${index}-${each}-horizontal-tag`}>{each}&nbsp;</span>
              ))}
            </p>
          )}
          <div>
            {favOrDone === 'fav' && (
              <button className="det-btn" onClick={() => disFav(card.id, card.type, setFav)}>
                <img
                  src={blackHI}
                  alt="favorite button"
                  data-testid={`${index}-horizontal-favorite-btn`}
                />
              </button>
            )}
            <button className="det-btn" onClick={() => shareBt(card.id, card.type, setCopiado)}>
              <img data-testid={`${index}-horizontal-share-btn`} alt="share button" src={shareI} />
              {copiado && <span>Link copiado!</span>}
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}

export default HCard;

HCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  favOrDone: PropTypes.string.isRequired,
};
