import { ADD_CHARACTER, DELETE_CHARACTER, FILTER,ORDER } from "./types";

export function addFavorite(character) {

    return {

        type: ADD_CHARACTER,
        payload: character,
    };
}
export function removeFavorite(id) {

return {

    type: DELETE_CHARACTER,
    payload: id,
};   
     }

export const filterCards = (gender) => {

    return {type: FILTER, payload: gender}
}

export const orderCards = (order) => {

    return {type:ORDER,payload:order}

}