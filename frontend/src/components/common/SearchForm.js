import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /** Handles submission of form */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);

    setSearchTerm(searchTerm.trim());
  };

  /** Updates form field when typing */
  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            name="searchTerm"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
