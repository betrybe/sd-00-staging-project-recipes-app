import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as storage from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../contexts/AppContext';
import * as share from '../services/share';

function favoriting(setLiked, liked, details, Meal) {
  if (!liked) {
    setLiked(true);
    storage.setNewFavLS(Meal, details);
  } else {
    setLiked(false);
    storage.removeFavLS(Meal, details);
  }
}

function ShLiButton() {
  const { liked, setLiked, details, Meal, copied, setCopied } = useContext(AppContext);
  return (
    <div className="icon-side">
      <div>
        <button className="det-btn" onClick={() => favoriting(setLiked, liked, details, Meal)}>
          <img
            alt="favorite button"
            data-testid="favorite-btn"
            src={liked ? blackHeartIcon : whiteHeartIcon}
          />
        </button>
        <button className="det-btn" onClick={() => share.share(Meal, details, setCopied)}>
          {copied && <span>Link copiado!</span>}
          <img data-testid="share-btn" alt="share button" src={shareIcon} />{' '}
        </button>
      </div>
    </div>
  );
}

export default ShLiButton;

ShLiButton.propTypes = {
  copied: PropTypes.bool.isRequired,
  setCopied: PropTypes.func.isRequired,
};
