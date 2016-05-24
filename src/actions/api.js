import {
    GET_PLAYERS,
    GET_RESULTS
} from '../constants/actionTypes';

import { API_ROOT_RESULTS } from '../constants';

export function getPlayers() {
    return (dispatch, getState) => new Promise((resolve) => {
        const { players: { players } } = getState();

        // Return false if we already have the venues
        if (players && Object.keys(players).length > 0) {
            return resolve();
        }

        return require.ensure(['../api/players'], (require) =>
            resolve(dispatch({
                type: GET_PLAYERS,
                players: require('../api/players')
            }))
        , 'players');
    });
}

export function getResults() {
    return (dispatch) => fetch(API_ROOT_RESULTS)
        .then((response) => response.json())
        .then((json) =>
            dispatch({
                type: GET_RESULTS,
                results: json
            })
        )
        .catch(() => {});
}
