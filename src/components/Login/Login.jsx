import { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer = (prevState, actions) => {
  if (actions.name === "USER_TYPING") {
    return { value: actions.payload, isValid: actions.payload.includes("@") };
  } else if (actions.name === "CLICKED_OUT") {
    return { value: prevState.value, isValid: prevState.value.includes("@") };
  } else {
    return { value: "", isValid: null };
  }
};

const passwordReducer = (prevState, actions) => {
  switch (actions.name) {
    case "USER_TYPING":
      return {
        value: actions.payload,
        isValid: actions.payload.trim().length > 6,
      };
    case "CLICKED_OUT":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: null };
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispathEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [password, dispathPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("aaa");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);

    return () => {
      clearTimeout(timer);
      console.log("zzz");
    };
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispathEmail({ name: "USER_TYPING", payload: event.target.value });
    // console.log("aaa");
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispathPassword({ name: "USER_TYPING", payload: event.target.value });
    // console.log("aaa");
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispathEmail({ name: "CLICKED_OUT" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispathPassword({ name: "CLICKED_OUT" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
