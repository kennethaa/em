import {
    GET_PLAYERS
} from '../constants/actionTypes';

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
