import React from "react";
import './ShowMore.css';

function ShowMore(props) {
  return (
    <section className={`show-more ${props.isButton ? 'show-more_type_active' : ''}`}>
      <button onClick={props.onClick} className="show-more__button" >Ещё</button>
    </section>
  )
}

export default ShowMore;