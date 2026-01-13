import { ADD_CHARACTER, DELETE_CHARACTER, FILTER, ORDER, GET_FAVORITE, CLEAR_FAVORITES } from "../actions/types"

const initialState = {

    myFavorites: [],
    allCharactersFav: [],
}

export default function reducer(state = initialState, { type, payload }) {

    switch (type) {

        // case ADD_CHARACTER:
        // return {
        //     ...state,
        //     myFavorites: [...state.allCharactersFav, payload],
        //     allCharactersFav: [...state.allCharactersFav, payload]

        // } ; 

        case GET_FAVORITE:
            return {
                ...state,
                myFavorites: payload,
                allCharactersFav: payload
            }

        // case ADD_CHARACTER:
        //     // evitar duplicados
        //     if (state.allCharactersFav.some(fav => fav.id === payload.id)) {
        //         return state;
        //     }

        //     return {
        //         ...state,
        //         myFavorites: [...state.myFavorites, payload],
        //         allCharactersFav: [...state.allCharactersFav, payload]
        //     };

        case ADD_CHARACTER:
            return {
                ...state,
                myFavorites: payload,
                allCharactersFav: payload

            };

        // case DELETE_CHARACTER:
        //     return {
        //         ...state, 
        //         myFavorites: state.myFavorites.filter(elem => elem.id !== payload)
        //     }
        // case DELETE_CHARACTER:
        //     return {
        //         ...state,
        //         myFavorites: state.myFavorites.filter(elem => elem.id !== payload),
        //         allCharactersFav: state.allCharactersFav.filter(elem => elem.id !== payload)
        //     };

        case DELETE_CHARACTER:
            return { ...state, myFavorites: payload };

        case CLEAR_FAVORITES:
            return { ...initialState, }

        case FILTER:
            const allCharactersFiltered = state.allCharactersFav.filter(character =>
                character.gender === payload)

            return {
                ...state,
                myFavorites:
                    payload === 'allCharacters'
                        ? [...state.allCharactersFav]
                        : allCharactersFiltered
            }

        case ORDER:
            const allCharactersFavCopy = [...state.allCharactersFav]
            return {
                ...state,
                myFavorites:
                    payload === 'A'
                        ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
                        : allCharactersFavCopy.sort((a, b) => b.id - a.id)
            }
        default:
            return { ...state };
    }
}