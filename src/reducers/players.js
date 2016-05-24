import { GET_PLAYERS } from '../constants/actionTypes';

const initialState = {
    players: {},
    playersByRank: []
};

export default function players(state = initialState, action) {
    switch (action.type) {
        case GET_PLAYERS: {
            const newPlayers = {};
            const playersByRank = [];

            action.players.forEach((info, i) => {
                const _id = i + 1;
                const player = {
                    _id,
                    info
                };

                newPlayers[_id] = player;
                playersByRank.push(player);
            });

            return Object.assign({}, state, {
                players: newPlayers,
                playersByRank
            });
        }

        default:
            return state;
    }
}
