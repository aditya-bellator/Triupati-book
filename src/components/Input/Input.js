import { forwardRef } from 'react';


//scss
import "./Input.scss";

const Input = forwardRef(function Input(props, ref) {

  return (
    <div>
      <input
        aria-invalid={props.ariaInvalid}
        aria-describedby={props.ariaDescribedby}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        id={props.id}
        autoComplete={props.autoComplete}
        value={props.value}
        name={props.name}
        ref={ref}
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        onChange={props.onChange}
        checked={props.checked}
        min={props.min}
        max={props.max}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
      />
    </div>
  );
});

export default Input;
