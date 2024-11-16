import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { loginFaculty, facultyRegister } from "../../../actions/auth";
import PropTypes from "prop-types";
import store from "../../../store";
import "../Slide.css";

const FacultyLogin = ({
  setAlert,
  facultyRegister,
  loginFaculty,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dept: "",
  });

  const { name, email, password, dept } = formData;

  const [loginTag, setLoginTag] = useState(true);

  let signUpButton = document.getElementById("signUp");
  let signInButton = document.getElementById("signIn");
  let container = document.getElementById("container");

  useEffect(() => {
    signUpButton = document.getElementById("signUp");
    signInButton = document.getElementById("signIn");
    container = document.getElementById("container");
  }, []);

  const addClass = () => {
    container.classList.add("right-panel-active");
  };

  const removeClass = () => {
    container.classList.remove("right-panel-active");
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    console.log(formData);
    loginFaculty(email, password);
  };

  const register = async (e) => {
    e.preventDefault();
    console.log(formData);
    facultyRegister({ name, email, password, dept });
  };

  if (isAuthenticated) {
    return <Redirect to="/faculty/courses" />;
  }

  return (
    <div className="body">
      <h1 style={{ textAlign: "center", fontWeight: "700", fontSize: "50px" }}>
        <b>Faculty Login</b>
      </h1>

      <div className="container" id="container">
        {loginTag === false ? (
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={(e) => register(e)}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="Department"
                value={dept}
                name="dept"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
              <button type="submit">Sign Up</button>
            </form>
            <button
              onClick={() => toggleForm("signIn")}
              className="newButton"
              id="signIn"
            >
              Already have an account!
            </button>
          </div>
        ) : (
          <div className="form-container sign-in-container">
            <form action="#" onSubmit={(e) => login(e)}>
              <h1>Sign In</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
              <button type="submit">Sign In</button>
            </form>
            <button
              onClick={() => toggleForm("signUp")}
              className="newButton"
              id="signUp"
            >
              Don't have an account?
            </button>
          </div>
        )}

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already have an account!</h1>
              <p>Please login to access your profile</p>
              <button
                onClick={() => toggleForm("signIn")}
                className="ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <p>Go ahead and create an account for yourself!!</p>
              <button
                onClick={() => toggleForm("signUp")}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // JavaScript for toggling forms
  function toggleForm(targetForm) {
    const container = document.getElementById("container");
    if (targetForm === "signUp") {
      container.classList.add("right-panel-active");
      setLoginTag(false);
    } else {
      container.classList.remove("right-panel-active");
      setLoginTag(true);
    }
  }
};

FacultyLogin.propTypes = {
  loginFaculty: PropTypes.func.isRequired,
  facultyRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  loginFaculty,
  facultyRegister,
})(FacultyLogin);
