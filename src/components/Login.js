import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const {state, dispatch} = useContext(UserContext)

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('in handlesubmit')
    const { phone, password } = user;
    console.log(phone, password)
    const res = await fetch("https://malaria-backend.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    });
    console.log('response:',res)
    const data = await res.json();
    console.log('data:',data.token);
    localStorage.setItem("jwtoken", data.token);
    if (res.status === 422 || !data) {
      console.log("ERROR LOGGING IN!");
      setError(data.error);
    } else {
      dispatch({type: "USER", payload:true})
      console.log("LOGGED IN SUCCESSFULLY!");
      setError(null);
      navigate("/");
      window.alert(data.message);
    }
  };

  return (
    <div class="row mt-3">
      <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-xs-12">
        <h1>Please Log In</h1>

        <p>
          If you have not created an account yet, then please
          <Link to="/signup"> sign up</Link> first.
        </p>

        <div id="div_id_login" class="mb-3">
          <label for="id_login" class="form-label requiredField">
            Phone/ Email*
          </label>
          <div>
            <input
              value={user.phone}
              onChange={handleInputs}
              type="text"
              name="phone"
              placeholder="Phone or Email"
              minLength="1"
              maxlength="150"
              class="textinput textInput form-control"
              required=""
              id="id_login"
            />
          </div>
        </div>
        <div id="div_id_password" class="mb-1">
          <label for="id_password" class="form-label requiredField">
            Password*
          </label>
          <div>
            <input
              value={user.password}
              onChange={handleInputs}
              type="password"
              name="password"
              placeholder="Password"
              class="textinput textInput form-control"
              required=""
              id="id_password"
            />
          </div>
        </div>
        {error && (
          <div className="text-danger mb-2">{error}</div>
        )}
        <button
          onClick={handleSubmit}
          class="btn btn-primary mb-3"
          type="submit"
        >
          Log In
        </button>
        <p>
          <a class="button" href="#">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
