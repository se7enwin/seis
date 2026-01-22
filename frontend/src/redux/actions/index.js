import { ADD_CHARACTER, DELETE_CHARACTER, FILTER, ORDER, CLEAR_FAVORITES, GET_FAVORITE, LOGIN_SUCCESS, LOGOUT } from "./types";
import axios from "axios";

export const getFavorite = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
            "http://localhost:3010/harrypotter/fav",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: GET_FAVORITE,
            payload: data
        });
    };
};


export const addFavorite = (character) => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        const { data } = await axios.post(
            "http://localhost:3010/harrypotter/fav",
            character,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: ADD_CHARACTER,
            payload: data
        });
    };
};




export const removeFavorite = (info) => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        const { data } = await axios.post(
            "http://localhost:3010/harrypotter/delfav",
            info,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: DELETE_CHARACTER,
            payload: data
        });
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
