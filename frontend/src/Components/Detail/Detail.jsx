import styles from "./Detail.module.css";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Detail(props) {
    const [infoDetail, setInfo] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const imageUrl = `http://localhost:3010/harrypotter/character/${id}/image`;

    console.log('id>', useParams());

    function backToHome() {

        navigate("/");
    }

    // montaje y cuando cambie el Id

    useEffect(() => {
        console.log(`Datos de Url: ,${process.env.REACT_APP_API_URL_LOCAL}${id}`)
        fetch(`${process.env.REACT_APP_API_URL_LOCAL}${id}`) // recibe dos parametros la funcion y el arreglo
            .then((g) => g.json())
            .then((h) => {
                //nos llega la respuesta
                console.log('Respuesta backend: ', h)
                if (h.name) {
                    console.log(h.name);
                    setInfo(h);
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

            {infoDetail.id ? <div class={styles.container}>

                <h1 id='name'>{infoDetail.name}</h1>
                <h5 id='house'>{infoDetail.house}</h5>
                <h5 id='ancestry'>{infoDetail.ancestry}</h5>
                <img class={styles.image} src={imageUrl} alt={infoDetail.name} />
                <h5 id='ancestry'>{infoDetail.actor}</h5>
                <h5 id='ancestry'>{infoDetail.hairColour}</h5>
                <h5 id='magic'>{infoDetail.wand.wood}</h5>
                <h5 id='magic'>{infoDetail.wand.core}</h5>
                <h5 id='magic'>{infoDetail.wand.length}</h5>


            </div> : <h1>Loading</h1>}</div>

    );

}

