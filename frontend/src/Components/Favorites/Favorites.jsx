import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from "../../redux/actions";
import Card from "../Card/Card";

export default function Favorites() {
    const dispatch = useDispatch();
    const myFavorites = useSelector(state => state.myFavorites);

    useEffect(() => {
        if (!myFavorites.length) {
            dispatch(getFavorite());
        }
    }, [dispatch, myFavorites.length]);

    if (!myFavorites.length) {
        return <h3 style={{ textAlign: 'center', color: 'red' }}>No hay favoritos</h3>;
    }

    return (
        <div>
            {myFavorites.map(elem => (
                <Card
                    key={elem.id}
                    {...elem}
                    onClose={() => { }}
                />
            ))}
        </div>
    );
}
