import React, {useState, useEffect} from "react";
import classes from "./auth.module.css";
import LoginForm from "../../components/loginForm/loginForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const handleGoLoginModalBtn = () => {
        setShowLoginForm(true);
    };

    return (
    <div>
        {showLoginForm && <LoginForm />}
    </div>
    );
};


export default AuthPage;