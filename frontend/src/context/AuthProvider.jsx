import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutAction } from "../redux/actions/index";


import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(null);
    const [cargando, setCargando] = useState(true);
    const dispatch = useDispatch();


    // Validar token al iniciar la app
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setCargando(false);
                return;
            }

            try {
                const { data } = await axios.get(
                    "http://localhost:3010/harrypotter/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setAuth(data); // info del usuario
                dispatch(loginSuccess(data));

            } catch (error) {
                console.log(error);
                setAuth(null);
                dispatch(logoutAction());

                localStorage.removeItem("token");
            } finally {

                setCargando(false);
            }

        };

        autenticarUsuario();
    }, []);

    // Login
    const login = async ({ email, password }) => {
        const { data } = await axios.post(
            "http://localhost:3010/harrypotter/login",
            { email, password }
        );



        localStorage.setItem("token", data.token);
        setAuth(data.user);       // <--- asegúrate que `data.user` existe
        dispatch(loginSuccess(data.user)); // 👈 Redux sync
        return data.user.id;      // opcional: devolver id para actualizar userLogin
    };


    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setAuth(null);
        dispatch(logoutAction()); // 👈 Redux sync

    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                cargando,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
