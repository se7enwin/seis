import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About"
import Detail from "./Components/Detail/Detail"
import Cards from './Components/Cards/Cards'
import Favorites from "./Components/Favorites/Favorites";
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
export default function App() {

    // Assign first state
    const [magus, setMagus] = useState([]);


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
    return (
        <div>

            {/* Add first css attribute from jsx syntax */}
            <h3 id='five' style={{ color: 'green' }}>Function Component from Local Jsx </h3>
            <Link target="_blank" to="https://github.com/gnuns/allOrigins"><span>Cors web page</span></Link>
            {/*Render Nav - Attach props */}
            <Nav getApi={getApi} />
            {/*Render Cards - Attach props */}
            {/* <Cards magus={magus} /> */}
            <Routes>
                <Route path='/' element={<Cards magus={magus} onClose={onClose} />} />
                {/* url path to About.jsx*/}
                <Route path='/about' element={<About />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/favorites' element={<Favorites />} />
            </Routes>
        </div>
    )
}


