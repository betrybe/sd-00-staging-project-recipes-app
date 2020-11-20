import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selecCategory, setSelecCategory] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [searchBarOn, setSearchBarOn] = useState(false);
  const [Meal, setMeal] = useState(true);
  const [cards, setCards] = useState([]);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState(false);
  const estados = {
    email,
    setEmail,
    password,
    setPassword,
    searchBarOn,
    setSearchBarOn,
    filteredData,
    setFilteredData,
    selecCategory,
    setSelecCategory,
    selectedId,
    setSelectedId,
    loading,
    setLoading,
    details,
    setDetails,
    Meal,
    setMeal,
    liked,
    setLiked,
    copied,
    setCopied,
    fav,
    setFav,
    cards,
    setCards,
  };

  return <AppContext.Provider value={estados}>{children}</AppContext.Provider>;
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
