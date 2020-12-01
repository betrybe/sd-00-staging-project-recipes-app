import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
// import '../visual_identity/styles/2.Layout/Footer.css';
import { resetShouldFetch, clearState } from '../redux/actions/mainPageFetcher';

const Footer = ({ clear, clearAndDontUpdate }) => (
  <div data-testid="footer" className="position-fixed-bottom">
    <Link to="/bebidas" onClick={ () => clear() }>
      <button
        type="button"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="" />
      </button>
    </Link>
    <Link to="/explorar" onClick={ () => clearAndDontUpdate() }>
      <button
        type="button"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="" />
      </button>
    </Link>
    <Link to="/comidas" onClick={ () => clear() }>
      <button
        type="button"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="" />
      </button>
    </Link>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(resetShouldFetch()),
  clearAndDontUpdate: () => dispatch(clearState()),
});

export default connect(null, mapDispatchToProps)(Footer);
