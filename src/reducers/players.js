import { GET_PLAYERS, GET_RESULTS } from '../constants/actionTypes';

const SPLIT = ', ';

const POINTS_MATCH_WINNER = 1;
const POINTS_MATCH_RESULT = 1;

const POINTS = {
    'Toppscorer etter gruppespill': 5,
    'Assistkonge etter gruppespill': 5,
    'Råtasslag etter gruppespill': 5,
    'Hvem går videre til 8-delsfinaler?': 2,
    Kvartfinalelag: 3,
    Semifinalelag: 4,
    Finalelag: 5,
    Vinnerlag: 10,
    Toppscorer: 10,
    Assistkonge: 10
};

const ARRAYS = {
    'Hvem går videre til 8-delsfinaler?': true,
    Kvartfinalelag: true,
    Semifinalelag: true,
    Finalelag: true,
};

const initialState = {
    players: {},
    playersByRank: [],
    results: {}
};

export default function players(state = initialState, action) {
    switch (action.type) {
        case GET_PLAYERS: {
            const newPlayers = {};
            const playersByRank = [];

            action.players.forEach((r, i) => {
                const results = r;

                const _id = i + 1;
                const name = results['Fullt navn'];
                const timestamp = results.Tidsmerke;

                delete results['Fullt navn'];
                delete results.Tidsmerke;

                const points = {};

                let totalPoints = 0;

                Object.keys(results).forEach((key) => {
                    if (state.results && state.results[key]) {
                        if (state.results[key] === results[key]) {
                            // Group matches
                            if (!POINTS[key]) {
                                // TODO: winner / result
                                points[key] = 1;
                                totalPoints++;
                            } else if (POINTS[key]) {
                                points[key] = POINTS[key];
                                totalPoints = totalPoints + POINTS[key];
                            }
                        }
                    }
                });

                const player = {
                    _id,
                    name,
                    timestamp,
                    results,
                    points,
                    totalPoints
                };

                newPlayers[_id] = player;
                playersByRank.push(player);
            });

            playersByRank.sort((a, b) => {
                if (a.totalPoints === b.totalPoints) return a.name.localeCompare(b.name);

                if (a.totalPoints > b.totalPoints) return -1;
                if (a.totalPoints < b.totalPoints) return 1;

                return 0;
            });

            return Object.assign({}, state, {
                players: newPlayers,
                playersByRank
            });
        }

        case GET_RESULTS: {
            const results = action.results.feed.entry[0];

            const KEY = '$t';

            return Object.assign({}, state, {
                results: {
                    'Frankrike - Romania': results['gsx$frankrike-romania'][KEY],
                    'Albania - Sveits': results['gsx$albania-sveits'][KEY],
                    'Romania - Sveits': results['gsx$romania-sveits'][KEY],
                    'Frankrike - Albania': results['gsx$frankrike-albania'][KEY],
                    'Sveits - Frankrike': results['gsx$sveits-frankrike'][KEY],
                    'Romania - Albania': results['gsx$romania-albania'][KEY],
                    'Wales - Slovakia': results['gsx$wales-slovakia'][KEY],
                    'England - Russland': results['gsx$england-russland'][KEY],
                    'Russland - Slovakia': results['gsx$russland-slovakia'][KEY],
                    'England - Wales': results['gsx$england-wales'][KEY],
                    'Slovakia - England': results['gsx$slovakia-england'][KEY],
                    'Russland - Wales': results['gsx$russland-wales'][KEY],
                    'Polen - Nord-Irland': results['gsx$polen-nord-irland'][KEY],
                    'Tyskland - Ukraina': results['gsx$tyskland-ukraina'][KEY],
                    'Ukraina - Nord-Irland': results['gsx$ukraina-nord-irland'][KEY],
                    'Tyskland - Polen': results['gsx$tyskland-polen'][KEY],
                    'Ukraina - Polen': results['gsx$ukraina-polen'][KEY],
                    'Nord-Irland - Tyskland': results['gsx$nord-irland-tyskland'][KEY],
                    'Tyrkia - Kroatia': results['gsx$tyrkia-kroatia'][KEY],
                    'Spania - Tsjekkia': results['gsx$spania-tsjekkia'][KEY],
                    'Tsjekkia - Kroatia': results['gsx$tsjekkia-kroatia'][KEY],
                    'Spania - Tyrkia': results['gsx$spania-tyrkia'][KEY],
                    'Kroatia - Spania': results['gsx$kroatia-spania'][KEY],
                    'Tsjekkia - Tyrkia': results['gsx$tsjekkia-tyrkia'][KEY],
                    'Irland - Sverige': results['gsx$irland-sverige'][KEY],
                    'Belgia - Italia': results['gsx$belgia-italia'][KEY],
                    'Italia - Sverige': results['gsx$italia-sverige'][KEY],
                    'Belgia - Irland': results['gsx$belgia-irland'][KEY],
                    'Italia - Irland': results['gsx$italia-irland'][KEY],
                    'Sverige - Belgia': results['gsx$sverige-belgia'][KEY],
                    'Østerrike - Ungarn': results['gsx$østerrike-ungarn'][KEY],
                    'Portugal - Island': results['gsx$portugal-island'][KEY],
                    'Island - Ungarn': results['gsx$island-ungarn'][KEY],
                    'Portugal - Østerrike': results['gsx$portugal-østerrike'][KEY],
                    'Ungarn - Portugal': results['gsx$ungarn-portugal'][KEY],
                    'Island - Østerrike': results['gsx$island-østerrike'][KEY],
                    'Toppscorer etter gruppespill': results.gsx$toppscorerettergruppespill[KEY],
                    'Assistkonge etter gruppespill': results.gsx$assistkongeettergruppespill[KEY],
                    'Råtasslag etter gruppespill': results['gsx$råtasslagettergruppespill'][KEY],
                    'Hvem går videre til 8-delsfinaler?':
                        results['gsx$hvemgårvideretil8-delsfinaler'][KEY].split(SPLIT),
                    Kvartfinalelag: results.gsx$kvartfinalelag[KEY].split(SPLIT),
                    Semifinalelag: results.gsx$semifinalelag[KEY].split(SPLIT),
                    Finalelag: results.gsx$finalelag[KEY].split(SPLIT),
                    Vinnerlag: results.gsx$vinnerlag[KEY],
                    Toppscorer: results.gsx$toppscorer[KEY],
                    Assistkonge: results.gsx$assistkonge[KEY]
                }
            });
        }

        default:
            return state;
    }
}
