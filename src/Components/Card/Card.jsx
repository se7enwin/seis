import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/actions/index';
import styles from './Card.module.css'

// function Card({ name, image, house, wand, ancestry, id, addFavorite, removeFavorite, myFavorites }) {

//     const [isFav, setFav] = useState(false);
//     console.log('StarRender - isFav= ' + isFav)


//     function handleFavorite() {

//         console.log('Se Activa Boton - isFav= ' + isFav)
//         console.log('Character = ' + name + ' Id:' + id)

//         if (isFav) {

//             setFav(false);
//             removeFavorite(id);
//             console.log('EliminaCharacter')
//         } else {

//             addFavorite({ name, image, house, wand, ancestry, id, });
//             setFav(true);
//             console.log('AgregaCharacter')

//         }
//         console.log('Finaliza Boton - isFav= ' + isFav)

//     }

//     // eslint-disable-next-line
//     useEffect(() => {
//         myFavorites.forEach((fav) => {
//             if (fav.id === id) {
//                 setFav(true);
//                 console.log('DesdeUseEffect - isFav= ' + isFav + ' - Character: ' + name)

//             }
//         });

//         // eslint-disable-next-line
//     }, [myFavorites]);

//     console.log('EndRender  - isFav= ' + isFav);
//     console.log(myFavorites);


//     return (

//         <span id='Card'>

//             <Link to={`/detail/${id}`}>
//                 <p id="name">{name}</p>
//             </Link>
//             {isFav ? (
//                 <button onClick={handleFavorite}>❤️</button>
//             ) : (
//                 <button onClick={handleFavorite}>💟</button>
//             )}
//             <img id='img' src={image} />
//             <div id='house'>{house}</div>
//             <div id='ancestry' display='inline'>{ancestry.charAt(0).toUpperCase() + ancestry.slice(1)}</div>
//             <hr />
//             <table id='magic' border='1' cellSpacing="0"><caption>MagicWand</caption><thead><tr><th>Wood</th><th>Core</th><th>Length</th> </tr></thead><tbody><tr><td>{wand.wood.charAt(0).toUpperCase() + wand.wood.slice(1)}</td><td>{wand.core.charAt(0).toUpperCase() + wand.core.slice(1)}</td><td>{wand.length}</td></tr></tbody></table>

//         </span>




//     )

// }

export function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites,
    };
}
export default connect(mapStateToProps, { addFavorite, removeFavorite })(Card);


function Card({
    name,
    image,
    house,
    wand,
    ancestry,
    id,
    addFavorite,
    removeFavorite,
    myFavorites,
    onClose
}) {

    const isFav = myFavorites.some(fav => fav.id === id);

    function handleFavorite() {
        if (isFav) {
            removeFavorite(id);
        } else {
            addFavorite({ name, image, house, wand, ancestry, id });
        }
    }

    return (
        <span id='Card'>
            <Link to={`/detail/${id}`}>
                <p id="name">{name}</p>
            </Link>

            <button onClick={handleFavorite}>
                {isFav ? "❤️" : "💟"}
            </button>
            <button onClick={onClose} className={styles.closeButton}>X</button>

            <img id='img' src={image} />
            <div id='house'>{house}</div>
            <div id='ancestry'>
                {ancestry.charAt(0).toUpperCase() + ancestry.slice(1)}
                <hr />
                <table id='magic' border='1' cellSpacing="0"><caption>MagicWand</caption><thead><tr><th>Wood</th><th>Core</th><th>Length</th> </tr></thead><tbody><tr><td>{wand.wood.charAt(0).toUpperCase() + wand.wood.slice(1)}</td><td>{wand.core.charAt(0).toUpperCase() + wand.core.slice(1)}</td><td>{wand.length}</td></tr></tbody></table>







            </div>
        </span>
    );
}
