import React from 'react';

const Button = props => (
  <button
    id={props.id}
    className={["button", props.btnType].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>{props.children}</button>
)

export default Button;