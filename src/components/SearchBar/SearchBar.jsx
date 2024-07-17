import React from "react";
import "./SearchBar.css";

const SearchBar = ({ setSearch, ...props }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return <input type="number" onChange={handleChange} {...props} className="input_search" placeholder="Numéro du pokemon" required />;
};

export default SearchBar;
