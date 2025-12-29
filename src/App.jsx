import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About"
import Detail from "./Components/Detail/Detail"
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import Cards from './Components/Cards/Cards'
export default function App() {

    // Assign first state
    const [magus, setMagus] = useState([]);

    // Obtain character from id
    async function getApi(id) {
        try {
            //Get magus
            await fetch(`${process.env.REACT_APP_API_URL_ONE}${id}`).then(a => a.json().then(b => setMagus(old => [...old, ...b])))


        } catch (error) { console.log(error) }
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
                <Route path='/' element={<Cards magus={magus} />} />
                {/* url path to About.jsx*/}
                <Route path='/about' element={<About />} />
                <Route path='/detail/:id' element={<Detail />} />
            </Routes>
        </div>
    )
}


