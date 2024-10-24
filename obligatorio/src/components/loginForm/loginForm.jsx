import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";
import { useNavigate } from "react-router-dom";

function LoginForm({ createAccount }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleCreateAccountBtn = () => {
    // logica para crear cuenta here
    createAccount();
  };

  const handleLoginBtn = () => {
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;

    // aca se hace algo más

    if (rol == "admin") {
      navigate("/home");
    } else if (rol == "instructor") {
      navigate("/instructorHome");
    } else if (rol == "student") {
      navigate("/studentHome");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLoginBtn();
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <div className={classes.modalContainer}>
          <div className={classes.logoContainer}>
            <img src="/UCU SnowZone logo.png" className={classes.logo} />
          </div>
          <div className={classes.logoContainer}>
            <img
              src="/UCU SnowZone texto.png"
              alt="logo"
              className={classes.isologo}
            />
          </div>
          <div className={classes.field}>
            <label className={classes.label}>email</label>
            <input
              className="input"
              type="text"
              placeholder="Enter your email"
              ref={emailRef}
            ></input>
          </div>
          <div className={classes.field}>
            <label className={classes.label}>password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              onKeyDown={handleKeyDown}
            ></input>
          </div>
          <div className={classes.buttonContainer}>
            <button
              className="button"
              id={classes.loginButton}
              onClick={handleLoginBtn}
            >
              Login
            </button>
          </div>
          <div className={classes.buttonContainer}>
            <button
              style={{ font: "12px arial", marginBottom: "10px" }}
              onClick={createAccount}
            >
              Create account <strong>here</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
