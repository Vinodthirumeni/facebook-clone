import React from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider"; // CONTEXT API
import { actionTypes } from "./reducer"; // CONTEXT API

function Login() {
  const [{}, dispatch] = useStateValue(); //context
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER, //context
          user: result.user, //context
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLZcl1IvSqDvrxuIwG3mRlwerRaJ8LuYNECg&usqp=CAU"
          alt=""
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHxHkTFRx5Y7inCZtxIA3QdwynWbCumdfy3w&usqp=CAU"
          alt=""
        />
      </div>
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;