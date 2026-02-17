import { ADD_CHARACTER, DELETE_CHARACTER, FILTER, ORDER, CLEAR_FAVORITES, GET_FAVORITE, LOGIN_SUCCESS, LOGOUT } from "./types";
import axios from "axios";

export const getFavorite = () => {
    return async (dispatch) => {
        console.log('🚀 getFavorite ACTION DISPATCHED');

        const token = localStorage.getItem("token");
        console.log('🔑 token:', token);

        const { data } = await axios.get(
            "https://api-harrypotter.miniweb.ar/harrypotter/fav",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("Informacion desde action: ", data)
        dispatch({
            type: GET_FAVORITE,
            payload: data
        });
    };
};





// export const addFavorite = (character) => {
//     return async (dispatch) => {
//         const token = localStorage.getItem("token");

//         const { data } = await axios.post(
//             "http://localhost:3010/harrypotter/fav",
//             character,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );

//         dispatch({
//             type: ADD_CHARACTER,
//             payload: data
//         });
//     };
// };

export const addFavorite = (id) => {
    console.log('Desde Actions addFavorite - id: ', id)
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        await axios.post(
            "https://api-harrypotter.miniweb.ar/harrypotter/fav",
            { characterId: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(getFavorite()); // ✅ ÚNICA verdad
    };
};







export const removeFavorite = (id) => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        await axios.post(
            "https://api-harrypotter.miniweb.ar/harrypotter/delfav",
            { characterId: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // 🔁 sincronización real con DB
        dispatch(getFavorite());
    };
};



export const filterCards = (gender) => {

    return { type: FILTER, payload: gender }
}

export const orderCards = (order) => {

    return { type: ORDER, payload: order }

}
export const clearFavorites = (id) => {
    return { type: CLEAR_FAVORITES, payload: id }
};


export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const logoutAction = () => ({
    type: LOGOUT
});
