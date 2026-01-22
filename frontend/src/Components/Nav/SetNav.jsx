import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'; // Si usas Redux o alguna solución para manejar el estado de autenticación

function SetNav(props) {
    const [id, setId] = useState('');
    const [fullList, setFullList] = useState([]);

    // Lista de IDs extraída
    const ids = fullList.map(s => s.id);


    // useEffect para cargar la lista solo una vez
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL_ALL}`);
                const data = await res.json();
                setFullList(data);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        getList();
    }, []); // Dependencias vacías: se ejecuta solo al montar

    // Handle -  Save data input on state
    function handleSearch(event) {
        // Retorna el ID real del array de IDs
        const index = parseInt(event.target.value, 10) - 1;
        if (index >= 0 && index < ids.length) {
            setId(ids[index]);
        }
    }

    return (
        <div id='Nav'>
            <Link to='/home'>
                <span>Home</span>
            </Link>

            <input
                id='input'
                type='search'
                placeholder='Enter Magus - 1 to N'
                onChange={handleSearch}
            />
            <button onClick={() => { if (id) props.getApi(id) }}>Search</button>

            <Link to='/favorites'>
                <span>Favorites</span>
            </Link>
            <MenuHamburguesa />

            <button type="button" onClick={props.logOut}>LogOut</button>
        </div>
    );
}



export function MenuHamburguesa() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Asegúrate de que el estado esté correcto
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);
    const reset = `/reset-password/{token}`;

    /* 👆 Toggle */
    const toggleMenu = () => {
        setOpen(prev => !prev);
    };

    /* ❌ Click fuera */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="menu-container" ref={menuRef}>
            <button className="hamburger-btn" onClick={toggleMenu}>
                ☰
            </button>

            {open && (
                <ul className="menu-dropdown">
                    <li>
                        <Link to="/home" onClick={() => setOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">Perfil</Link>
                    </li>
                    {/* Aquí agregamos la validación para el enlace de Reset Password */}
                    {isAuthenticated && (
                        <li>

                            <Link to={reset}>Restablecer Contraseña</Link>
                        </li>
                    )}
                    {/* Opcionalmente, también puedes agregar un logout o redirección */}
                    {!isAuthenticated && (
                        <li>
                            <Link to="/login">Iniciar sesión</Link>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );

}
export default SetNav;

