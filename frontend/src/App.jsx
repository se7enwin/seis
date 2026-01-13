import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About"
import Detail from "./Components/Detail/Detail"
import Cards from './Components/Cards/Cards'
import Favorites from "./Components/Favorites/Favorites";
import Forms from './Components/Forms/Form';
import Register from './Components/Forms/Register';
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavorites } from './redux/actions/index.js';
import { getFavorite } from './redux/actions';


export default function App() {


    const myFavorites = useSelector((state) => state.myFavorites);


    // Assign first state
    const [magus, setMagus] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [access, setAccess] = useState(false);
    const [userLogin, setLogin] = useState(0);
    const dispatch = useDispatch();
    const [check, setCheck] = useState(true);
    const [register, setRegister] = useState(false);

    // Obtain character from id
    async function getApi(id) {
        try {
            //Get magus
            const igual = magus.find(ele => ele.id == id)
            if (igual) {
                return window.alert('El personaje ya está seleccionado');
            }
            else
                await fetch(`${process.env.REACT_APP_API_URL_ONE}${id}`).then(a => a.json().then(b => setMagus(old => [...old, ...b])))


        } catch (error) { console.log(error) }
    }

    function onClose(id) {

        setMagus(magus.filter((mg) => mg.id !== id));

    }

    async function login(userData) {

        try {
            const { username, password } = userData;
            const URL = 'http://localhost:3010/harrypotter/login/'; // Desarrollo
            //const URL = 'http://181.31.45.250:3002/rickandmorty/login/'; // Produccion
            //const URL = 'https://apirickandmorty.miniweb.ar/rickandmorty/login/'; // api
            const { data } = await axios(URL + `?email=${username}&password=${password}`)
            const { access } = data;
            const { userId } = data;
            console.log('userId: ', userId)
            //console.log('usuario: '+userData.username)
            //console.log('Estado de data {}: ',data);
            setAccess(access); // Devuelve true or false
            access && navigate('/home');
            setLogin(userId);
            console.log('Estado de userLogin: ', userLogin, ' \nEstado de access: ', access);

        } catch (error) {
            console.log(error)
        }

    }

    async function createLogin(userData) {
        try {
            const { username, password, age } = userData;
            //e.preventDefault();


            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password: password, age: age })
            };
            fetch('http://localhost:3010/harrypotter/login', requestOptions) // desrrollo
                //fetch('http://181.31.45.250:3002/rickandmorty/login', requestOptions) // produccion
                //fetch('https://apirickandmorty.miniweb.ar/rickandmorty/login', requestOptions) // api

                .then(response => response.json())
                .then(result => console.log(result));
        } catch (error) {
            console.log(error)
        }
        !access && navigate('/');
    };

    useEffect(() => { // Aplicar Switch: Value: Location+AccessState --> Concat?

        if (!access && location.path == '/register') { navigate('/register') }
        else if (!access && location.path == '/') { navigate('/') }
        else if (!access && location !== '/' && location !== '/register') { navigate('/') || navigate('/register') }
    }, [access]);

    console.log('Location es igual a: ', location);
    console.log(`Access= ${access} Favorites= ${myFavorites.length} Check= ${check}`)

    useEffect(() => {

        if (myFavorites.length === 0 && access && check && userLogin) // { dispatch(getFavorite(userLogin));}
        {
            console.log('Ingresa a getFavorite?');
            dispatch(getFavorite(userLogin));
            setCheck(false);
        }
    }
        , [access, location]);

    const logOut = () => {
        setMagus([]);
        setLogin(0);
        setAccess(false);
        setRegister(true);
        setCheck(true);
        dispatch(clearFavorites(userLogin));
        navigate('/')
    }
    console.log('Register: ', register)




    return (
        <div>

            {/* Add first css attribute from jsx syntax */}
            <h3 id='five' style={{ color: 'green' }}>Function Component from Local Jsx </h3>
            <Link target="_blank" to="https://github.com/gnuns/allOrigins"><span>Cors web page</span></Link>
            {/*Render Nav - Attach props */}
            {location.pathname !== '/' && location.pathname !== '/register' && <Nav getApi={getApi} logOut={logOut} />}
            {/*Render Cards - Attach props */}
            {/* <Cards magus={magus} /> */}
            <Routes>
                <Route path='/home' element={<Cards magus={magus} onClose={onClose} access={access} register={register} setRegister={setRegister} userLogin={userLogin} />} />
                {/* url path to About.jsx*/}
                <Route path='/about' element={<About />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/favorites' element={<Favorites userLogin={userLogin} />} />
                <Route path='/' element={<Forms login={login} />} />
                <Route path='/register' element={<Register createLogin={createLogin} />} />

            </Routes>
        </div>
    )
}


