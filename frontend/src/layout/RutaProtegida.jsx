import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const RutaProtegida = () => {
    const { auth, cargando } = useContext(AuthContext);

    if (cargando) return <p>Cargando...</p>;

    //return auth ? <Outlet /> : <Navigate to="/" />;
    return auth ? children : <Navigate to="/login" />;

};

export default RutaProtegida;
