import { useState } from 'react';
import { Link } from "react-router-dom"

export default function SetNav(props) {

    const [id, setId] = useState('');
    // FullList state 
    const [fullList, setfullList] = useState([]);
    // Full List ids
    const ids = [];
    // Api url
    const apiList = 'https://hp-api.onrender.com/api/characters';
    // Get json from api
    if (fullList[0] == undefined) { getList(); console.log('Ids: ', ids); }
    // Get json from api

    async function getList() {

        // Get full list api

        //await fetch(`${props.cors}${apiList}`).then(c => c.json().then(d => setfullList(d)));
        await fetch(`${process.env.REACT_APP_API_URL_ALL}`).then(c => c.json().then(d => setfullList(d)));
        console.log('Datos: ', fullList)

    }
    /* Push full id list on array*/
    fullList?.map(s => { ids.push(s['id']) })
    console.log('Ids Ingresado: ', ids);

    // Handle -  Save data input on state
    function handleSearch(event) {
        //Return real id from subindice array
        setId(ids[((event.target.value) - 1)])
        console.log('Ingreso Id: ', id)

    }
    return (
        <div id='Nav'>
            <Link to='/home'>
                <span>Home</span>
            </Link>
            {/* Input listener - active handler */}
            <input id='input' type='search' placeholder='Enter Magus - 1 to 5' onChange={handleSearch} />
            {/* Onclick listener - active getApi */}
            <button onClick={() => { if (id !== '') { props.getApi(id) } }}>Search</button>
            <Link to='/favorites'>
                <span>Favorites</span>
            </Link>
            <button type="button" onClick={props.logOut}>LogOut</button>

        </div>
    )

}