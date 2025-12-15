import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About"
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import Cards from './Components/Cards/Cards'
export default function App() {

    // Assign first state
    const [magus, setMagus] = useState([]);
    // Query from Local Host
    const api = 'https://hp-api.onrender.com/api/character/';
    // Enable cors from localshot     
    const cors = 'https://corsproxy.io/?'


     function getApi(id) {
       
            //Get magus
             fetch(`${cors}${api}${id}`).then(a => a.json().then(b => setMagus(old => [...old, ...b])))
                       
            }



    return (
        // Main Render Tag
        <div>

            {/* Add first css attribute from jsx syntax */}
            <h3 style={{ color: 'green' }}>Function Component from Local Jsx </h3>
            <Nav getApi={getApi} cors={cors} />
            {/* Click and Enable Cors for a while */}
            <Link target="_blank" to="https://corsproxy.io/?"><h6>Cors Link Web Page</h6></Link>
            {/* Id for first query */}
            <Cards magus={magus} />
            <Routes>
                {/* url path to About.jsx*/}
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    )
}
