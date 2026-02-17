import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/actions";
import styles from "./Card.module.css";

function Card({
    id,
    name,
    image,
    house,
    wand,
    ancestry,
    addFavorite,
    removeFavorite,
    myFavorites,
    onClose,
    userLogin
}) {
    //const [isFav, setIsFav] = useState(false);

    // En reemplazo de IsFav línea anterior
    const isFav = myFavorites?.some(
        fav => fav.id === id
    );
    console.log("Se ha encontrado Card en Store Redux ?: ", isFav)
    console.log("Valor Id: ", id)
    console.log("Valor CharacterId: ", myFavorites.map(a => a))

    const imageUrl = `https://api-harrypotter.miniweb.ar/harrypotter/character/${id}/image`;

    //console.log("StarRender - isFav =", isFav);
    console.log("UserLogin =", userLogin);

    // function handleFavorite() {
    //     if (!userLogin) return;

    //     if (isFav) {
    //         console.log('Se quitará el favorito nro: ', id)
    //         removeFavorite(id);
    //         setIsFav(false);
    //     } else {
    //         console.log('Se agregará el favorito nro: ', id)
    //         addFavorite(id);
    //         setIsFav(true);
    //     }
    // } 

    function handleFavorite() {
        if (!userLogin) return;

        if (isFav) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
    }



    // useEffect(() => {
    //     if (!Array.isArray(myFavorites)) return;

    //     const exists = myFavorites.some(
    //         fav => fav.id === id || fav.characterId === id
    //     );

    //     // setIsFav(exists);
    // }, [myFavorites, id]);



    return (
        <span id="Card">
            <Link to={`/detail/${id}`}>
                <p id="name">{name}</p>
            </Link>

            <button onClick={handleFavorite}>
                {isFav ? "❤️" : "💟"}
            </button>


            {onClose && (
                <button onClick={onClose} className={styles.closeButton}>
                    X
                </button>
            )}

            <img id="img" src={imageUrl} alt={name} />

            <div id="house">{house || "Unknown"}</div>

            <div id="ancestry">
                {ancestry
                    ? ancestry.charAt(0).toUpperCase() + ancestry.slice(1)
                    : "Unknown"}
                <hr />

                <table id="magic" border="1" cellSpacing="0">
                    <caption>Magic Wand</caption>
                    <thead>
                        <tr>
                            <th>Wood</th>
                            <th>Core</th>
                            <th>Length</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {wand?.wood
                                    ? wand.wood.charAt(0).toUpperCase() + wand.wood.slice(1)
                                    : "Unknown"}
                            </td>
                            <td>
                                {wand?.core
                                    ? wand.core.charAt(0).toUpperCase() + wand.core.slice(1)
                                    : "Unknown"}
                            </td>
                            <td>{wand?.length ?? "Unknown"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </span>
    );
}

const mapStateToProps = state => ({
    myFavorites: state.myFavorites
});

export default connect(mapStateToProps, {
    addFavorite,
    removeFavorite
})(Card);
