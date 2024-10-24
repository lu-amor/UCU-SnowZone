import React, {useState, useEffect} from "react";
import classes from "./auth.module.css";
import LoginForm from "../../components/loginForm/loginForm";
import CreateAccountForm from "../../components/loginForm/createAccountForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    const handleCreateAccountBtn = () => {
        setShowCreateAccountForm(true);
        setShowLoginForm(false);
    };

    const handleGoLoginModalBtn = () => {
        setShowCreateAccountForm(false);
        setShowLoginForm(true);
    };

    return (
    <div>
        {showLoginForm && <LoginForm createAccount={handleCreateAccountBtn} />}
        {showCreateAccountForm && (
            <CreateAccountForm goLogin={handleGoLoginModalBtn} />
        )}
    </div>
    );
};


export default AuthPage;