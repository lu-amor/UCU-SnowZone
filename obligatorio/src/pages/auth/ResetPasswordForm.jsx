import React, { useRef, useState } from "react";
import classes from "./resetPasswordForm.module.css";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
    const [error, setError] = useState(null);
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            //logic to reset password
            alert("Password successfully reset!");
            navigate("/login");
        }
    };

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <h2 className="title is-4 has-text-success">Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.field}>
                        <label className="has-text-weight-semibold mb-3 has-text-success">New Password</label>
                        <input className="input is-danger mt-1" type="password" ref={passwordRef} required placeholder="Enter your new password" />
                    </div>
                    <div className={classes.field}>
                        <label className="has-text-weight-semibold mb-3 has-text-success">Confirm Password</label>
                        <input className="input is-danger mt-1" type="password" ref={confirmPasswordRef} required placeholder="Confirm your new password" />
                    </div>
                    {error && <p className={classes.error}>{error}</p>}
                    <button className="button has-background-success has-text-white" type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
