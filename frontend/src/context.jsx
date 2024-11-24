import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser({ username, role: data.role });
        }
        return response.ok;
    };

    const logout = async () => {
        await fetch("/logout", { method: "POST" });
        setUser(null);
    };

    const checkLogin = async () => {
        const response = await fetch("/check");
        const data = await response.json();
        if (data.logged_in) {
            setUser(data.user);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);