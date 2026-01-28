import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About";
import Detail from "./Components/Detail/Detail";
import Cards from './Components/Cards/Cards';
import Favorites from "./Components/Favorites/Favorites";
import Forms from './Components/Forms/Forms.jsx';
import Register from './Components/Forms/Register';
import RutaProtegida from "./layout/RutaProtegida.jsx";
import ConfirmarCuenta from './Components/ConfirmarCuenta/ConfirmarCuenta.jsx';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import { clearFavorites } from './redux/actions';
import AuthContext from "./context/AuthProvider";



export default function App() {
    const myFavorites = useSelector((state) => state.myFavorites);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [hasRedirected, setHasRedirected] = useState(false);

    const [magus, setMagus] = useState([]);

    const { auth, cargando, logout } = useContext(AuthContext);

    // 🔑 ID de usuario desde JWT
    const userLogin = auth?.id;


    // 🔁 Redirección automática post-login SOLO si estamos en "/" o "/login"
    useEffect(() => {
        if (!cargando && auth && (location.pathname === '/' || location.pathname === '/login')) {
            navigate('/home');
        }
    }, [auth, cargando, location.pathname, navigate]);




    // 🔍 Buscar personaje
    async function getApi(id) {
        if (magus.find(ele => Number(ele.id) === Number(id))) {
            return alert('El personaje ya está seleccionado');
        }

        //const res = await fetch(`${process.env.REACT_APP_API_URL_ONE}${id}`);
        console.log('Id: ', id)
        //const res = await fetch(`${process.env.REACT_APP_API_URL_LOCAL}${id}`);
        const res = await fetch(`${process.env.REACT_APP_API_URL_LOCAL}${id}`, {
            cache: 'no-store'
        })
        console.log('Desde Base Local: ', res)
        const data = await res.json();
        setMagus(old => [...old, data]);
    }

    function onClose(id) {
        setMagus(magus.filter((mg) => mg.id !== id));
    }

    // 🔓 Logout completo
    const handleLogout = () => {
        logout();                  // borra token + auth
        setMagus([]);              // limpia cards
        dispatch(clearFavorites()); // limpia redux
        navigate('/login');
    };

    // 🔒 Ruta privada
    const PrivateRoute = ({ children }) => {
        if (cargando) return <p>Cargando...</p>;
        return auth ? children : <Navigate to="/login" />;
    };

    return (
        <div>
            {/* NAV solo si está logueado */}
            {auth && !['/login', '/register'].includes(location.pathname) && (
                <Nav getApi={getApi} logOut={handleLogout} />
            )}

            <Routes>
                {/* Públicas */}
                <Route path="/" element={<Forms />} />
                <Route path="/login" element={<Forms />} />
                <Route path="/register" element={<Register />} />
                <Route path="/confirmar/:token" element={<ConfirmarCuenta />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />


                {/* Privadas */}
                <Route path="/home" element={
                    <PrivateRoute>
                        <Cards
                            magus={magus}
                            onClose={onClose}
                            userLogin={userLogin}
                        />
                    </PrivateRoute>
                } />

                <Route element={<RutaProtegida />}>
                    <Route path="/favorites" element={<Favorites userLogin={userLogin} />} />
                </Route>



                <Route path="/detail/:id" element={
                    <PrivateRoute>
                        <Detail />
                    </PrivateRoute>
                } />

                <Route path="/jwt-test" element={
                    <PrivateRoute>
                        <RutaProtegida />
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    );
}
