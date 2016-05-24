import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/app';
import Players from '../containers/Players';
import Player from '../containers/Player';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Players} />
        <Route path="player/:playerId" component={Player} />
    </Route>
);
