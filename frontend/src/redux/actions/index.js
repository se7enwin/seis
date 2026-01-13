import { ADD_CHARACTER, DELETE_CHARACTER, FILTER, ORDER, CLEAR_FAVORITES, GET_FAVORITE } from "./types";
import axios from "axios";

export const getFavorite = (userLogin) => {

    try {
        const endpoint = 'http://localhost:3010/harrypotter/fav' // Desarrollo
        //const endpoint='http://181.31.45.250:3002/rickandmorty/fav' // Produccion
        //const endpoint = 'https://apirickandmorty.miniweb.ar/rickandmorty/fav' // Produccion


        return async (dispatch) => {
            const { data } = await axios.get(endpoint, { params: { userLogin: userLogin } });
            console.log('Se ejecutó getFavorite: ', data)
            return dispatch({
                type: GET_FAVORITE,
                payload: data,
            })

        }


    }
    catch (error) {
        console.log(error)
    }
};


export const addFavorite = (character) => {
    console.log('Desde Add Front, FavoriteId: ', character.id, '& userId: ', character.userId);

    try {
        const endpoint = 'http://localhost:3010/harrypotter/fav'; // desarrollo
        // const endpoint = 'http://181.31.45.250:3002/rickandmorty/fav'; // produccion
        //const endpoint = 'https://apirickandmorty.miniweb.ar/rickandmorty/fav'; // produccion

        return async (dispatch) => {
            const { data } = await axios.post(endpoint, character)
            console.log('Se ejecutó addFavorite: ', data)
            return dispatch({
                type: ADD_CHARACTER,
                payload: data,
            });
        };
    }
    catch (error) {
        console.log(error)
    }
};




export const removeFavorite = (info) => {
    console.log('Desde Remove Front, FavoriteId: ', info.id, '& userId: ', info.userId);
    try {
        const endpoint = 'http://localhost:3010/harrypotter/delfav/'; //desarrollo
        // const endpoint = 'http://181.31.45.250:3002/rickandmorty/delfav/'; // produccion
        //const endpoint = 'https://apirickandmorty.miniweb.ar/rickandmorty/delfav/'; // produccion

        return async (dispatch) => {
            const { data } = await axios.post(endpoint, info)
            return dispatch({
                type: DELETE_CHARACTER,
                payload: data,
            });
        };
    }

    catch (error) {
        console.log(error)
    }
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