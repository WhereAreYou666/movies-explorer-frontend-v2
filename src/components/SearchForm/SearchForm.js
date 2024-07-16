import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  function handleSearchSubmit(evt) {
    evt.preventDefault();
    if (props.cards.length > 0 && props.movies) {
      props.setCards([]);
      props.setNext(0);
    }
    props.onSubmit();
  }

  return (
    <section className="search">
      <form className="search__form" name="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="searchFormInput"
          className={`search__form-input ${props.isValidSubmit ? 'search__form-input_type_error' : ''}`}
          id="search-form-input"
          placeholder={props.isValueError}
          onChange={props.onChange}
          value={props.value}
        />
        <button type="submit" className="search__form-button">Поиск</button>
      </form>

      <FilterCheckbox
        onClickCheckbox={props.onClickCheckbox}
        isCheckbox={props.isCheckbox}
      />
    </section>
  )
}

export default SearchForm;