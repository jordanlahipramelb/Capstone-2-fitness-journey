import React, { useState } from "react";

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
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-4">
          <input
            className="form-control"
            name="searchTerm"
            placeholder="Enter search term"
            aria-label="Enter search term"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-outline-secondary">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
