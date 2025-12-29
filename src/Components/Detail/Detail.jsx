import styles from "./Detail.module.css";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Detail(props) {
    const [infoDetail, setInfo] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('id>', useParams());

    function backToHome() {

        navigate("/");
    }

    // montaje y cuando cambie el Id

    useEffect(() => {
        console.log(`Datos de Url: ,${process.env.REACT_APP_API_URL_ONE}${id}`)
        fetch(`${process.env.REACT_APP_API_URL_ONE}${id}`) // recibe dos parametros la funcion y el arreglo
            .then((g) => g.json())
            .then((h) => {
                //nos llega la respuesta
                if (h[0].name) {
                    console.log(h[0].name);
                    setInfo(...h);
                } else {
                    window.alert("No hay personajes con ese ID");
                }
            })
            .catch((err) => {
                window.alert('No hay personajes con ese ID');
            });
        // desmontaje
        return () => setInfo({});
    }, [id]); // pueden indicar id sino esta bien igual
    return (

        <div>
            <div>
                <button onClick={backToHome}>Volver</button>
            </div>

            {infoDetail.id ? <div>

                <h1 id='name'>{infoDetail.name}</h1>
                <h5 id='house'>{infoDetail.house}</h5>
                <h5 id='ancestry'>{infoDetail.ancestry}</h5>
                <h5 id='ancestry'>{infoDetail.actor}</h5>
                <h5 id='ancestry'>{infoDetail.hairColour}</h5>
                <h5 id='magic'>{infoDetail.wand.wood}</h5>
                <h5 id='magic'>{infoDetail.wand.core}</h5>
                <h5 id='magic'>{infoDetail.wand.length}</h5>
                <div>
                    <img src={infoDetail.image} alt={infoDetail.name} />
                </div>
                INFOR</div> : <h1>Loading</h1>}</div>

    );

}

// Borrar

<span id='Card'>

    <Link to={`/detail/${id}`}>
        <p id="name">{name}</p>
    </Link>
    <img id='img' src={image} />
    <div id='house'>{house}</div>
    <div id='ancestry' display='inline'>{ancestry.charAt(0).toUpperCase() + ancestry.slice(1)}</div>
    <hr />
    <table id='magic' border='1' cellSpacing="0"><caption>MagicWand</caption><thead><tr><th>Wood</th><th>Core</th><th>Length</th> </tr></thead><tbody><tr><td>{wand.wood.charAt(0).toUpperCase() + wand.wood.slice(1)}</td><td>{wand.core.charAt(0).toUpperCase() + wand.core.slice(1)}</td><td>{wand.length}</td></tr></tbody></table>

</span>