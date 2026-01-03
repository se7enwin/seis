import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card'
import { filterCards, orderCards } from '../../redux/actions';
import { useState } from 'react';

export default function Favorites(props) {
    console.log(props.myFavorites);

    const myFavorites = useSelector((state) => state.myFavorites);

    const dispatch = useDispatch();
    const [aux, setAux] = useState(false);

    const handleOrder = (event) => {

        dispatch(orderCards(event.target.value));
        setAux(true);
    }

    const handleFilter = (event) => {

        dispatch(filterCards(event.target.value))
    }


    return <div>

        {/* <select onChange={handleOrder}>
            <option value="A">Ascedente</option>
            <option value="D">Descendente</option>
        </select>
        <select onChange={handleFilter}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
            <option value='allCharacters'>All Characters</option>
        </select> */}
        {myFavorites.map((elem) => (

            <Card
                name={elem.name}
                house={elem.house}
                ancestry={elem.ancestry}
                image={elem.image}
                wand={elem.wand}
                id={elem.id}
                onClose={() => alert('Para elminar click en corazon')}
            />

        ))}


    </div>;
}
// export function mapStateToProps(state){
// return {

//     myFavorites: state.myFavorites,     // Reemplazamos desde l 21 a l 27 por Hook 'useSelector' . ya no ingresa atr por props sin no por estado
// };
// }
// export default connect(mapStateToProps)(Favorites);

// Borrar

