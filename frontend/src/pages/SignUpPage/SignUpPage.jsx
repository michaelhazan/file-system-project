import axios from "axios";
import { useContext, useRef } from "react";
import { CurrentSignedInUserContext } from "../../App";
import { useNavigate } from "react-router";

function SignUpPage() {
  const [, setCurrentUser] = useContext(CurrentSignedInUserContext);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();

  const showError = (err) => (errorRef.current.textContent = err);

  const submitHandler = (e) => {
    e.preventDefault();
    const /** @type {String} */ username = usernameRef.current.value;
    const /** @type {String} */ password = passwordRef.current.value;
    if (username.length < 3 || username.length > 20)
      return showError(
        "Usernames cannot be shorter than 3 characters or longer than 20."
      );
    if (password.length < 3)
      return showError("Passwords cannot be shorter than 3 characters.");
    if (password != repeatPasswordRef.current.value)
      return showError("The passwords don't match!");
    axios
      .post("/signup", { username, password })
      .then((res) =>
        res.status == 200
          ? setCurrentUser(res.data)
          : showError(res.data.errorMessage)
      )
      .catch(
        (err) =>
          showError(
            "An error accured while trying to contact the server, please try again later."
          ) && console.log(err)
      );
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <input
          ref={repeatPasswordRef}
          type="password"
          placeholder="Repeat Password"
        />
        <p ref={errorRef}></p>
        <button>Login</button>
      </form>
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate("/signin");
        }}
      >
        {"Already have an account?"}
      </a>
    </div>
  );
}

export default SignUpPage;