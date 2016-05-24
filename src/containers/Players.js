import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActionCreators from '../actions/api';
import { Grid } from 'react-flexbox-grid/lib';
import Nav from './nav';
import Loading from '../components/Loading';
import PlayersList from './PlayersList';

class Players extends Component {
    constructor(props, context) {
        super(props, context);

        this.getPlayers = this.getPlayers.bind(this);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.getPlayers();
    }

    getPlayers() {
        this.addLoading();

        const { apiActions: { getPlayers } } = this.props;

        getPlayers().then(() => this.removeLoading());
    }

    addLoading() {
        if (this.state.loading) {
            return;
        }

        this.setState({
            loading: true
        });
    }

    removeLoading() {
        if (!this.state.loading) {
            return;
        }
        this.setState({
            loading: false
        });
    }

    render() {
        const { loading } = this.state;
        const { params, playersByRank } = this.props;

        return (
            <Grid>
                <Nav
                    params={params}
                />
                {loading ?
                    <Loading />
                    :
                    <PlayersList params={params} playersByRank={playersByRank} />
                }
            </Grid>
        );
    }
}

Players.propTypes = {
    params: PropTypes.object.isRequired,
    apiActions: PropTypes.object.isRequired,
    playersByRank: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        apiActions: bindActionCreators(apiActionCreators, dispatch)
    };
}

export default connect(
    (state) => ({ playersByRank: state.players.playersByRank }),
    mapDispatchToProps
)(Players);
