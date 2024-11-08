import React, { useRef } from "react";
import classes from "./ForgotPasswordForm.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
    const emailRef = useRef("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:correo\.)?ucu\.edu\.uy$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email");
        } else {
            alert("If an account exists, a reset link has been sent to your email");
            navigate("/reset-password");
        }
    };

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <h2 className="title is-4 has-text-success">Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.field}>
                        <label className="has-text-weight-semibold mb-3 has-text-success">Email</label>
                        <input className="input is-danger mt-1" type="email" ref={emailRef} required placeholder="Enter your email" />
                    </div>
                    <button className="button has-background-success has-text-white" type="submit">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
