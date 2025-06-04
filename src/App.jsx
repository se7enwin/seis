import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About"
import { Route, Routes } from 'react-router-dom';
export default function App() {

    return (
        // Main Render Tag
        <div>

<<<<<<< HEAD
            {/* Add first css attribute from jsx syntax */}
            <h3 style={{ color: 'green' }}>Function Component from Local Jsx </h3>
            <Nav />
            <Routes>
                {/* url path to About.jsx*/}
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
=======
        <h3 style={{ color: 'green' }}>Function Component from Local Jsx </h3>
>>>>>>> 1cd351a (Update App.Jsx)
    )
}
