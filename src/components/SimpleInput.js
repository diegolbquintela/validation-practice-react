import { useState } from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState("");

  const enteredEmailIsValid = String(enteredEmail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid || enteredEmailIsValid) {
    formIsValid = true;
  }

  // handler functions
  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  //blur functions
  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setEnteredEmailTouched(true);

    //validation (client validation is for UX only)
    if (!enteredNameIsValid) {
      return;
    }

    resetNameInput();

    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  // class handler validation
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && <p className="error-text">empty form</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && <p className="error-text">email invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
