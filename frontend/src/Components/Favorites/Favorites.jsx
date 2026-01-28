import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from "../../redux/actions";
import Card from "../Card/Card";

function Favorites(props) {
    console.log("🟢 Favorites MOUNT");

    const dispatch = useDispatch();
    const myFavorites = useSelector(state => state.myFavorites);


    useEffect(() => {
        if (!props.userLogin) return;
        dispatch(getFavorite());
    }, [dispatch, props.userLogin]);

    console.log("RENDER FAVS", myFavorites);
    console.log("UserLogin Desde Favorite", props.userLogin);

    return (
        <div>
            {myFavorites.map(fav => (
                <Card
                    key={fav.id}
                    {...fav}
                    characterId={fav.id}
                    userLogin={props.userLogin}
                />
            ))}


        </div>
    );
}

export default Favorites;
