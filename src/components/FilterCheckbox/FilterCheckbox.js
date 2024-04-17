import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {

  return (
    <form className="filter">
      <label htmlFor="checkbox" className="filter__check-box">
        <input
          type="checkbox"
          className="filter__check-box-input"
          id="checkbox"
          onClick={props.onClickCheckbox}
        />
        <span className={`filter__check-box-text ${props.isCheckbox ? 'filter__check-box-text_type_active' : ''}`}>Короткометражки</span>
      </label>
    </form>
  )
}

export default FilterCheckbox;