import React from "react";
import { useUser } from "./context";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useUser();

    if (!user) {
        return <div>Acceso denegado. Inicia sesión primero.</div>;
    }

    if (role && user.role !== role) {
        return <div>No tienes permiso para ver esta página.</div>;
    }

    return children;
};

export default ProtectedRoute;