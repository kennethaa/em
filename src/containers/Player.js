import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActionCreators from '../actions/api';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Nav from './nav';
import Loading from '../components/Loading';
import {
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

const styles = {
    question: {
        whiteSpace: null
    },
    answer: {
        whiteSpace: null,
        width: '50%'
    },
    point: {
        textAlign: 'center',
        width: '25px'
    }
};

class Player extends Component {
    constructor(props, context) {
        super(props, context);

        this.getResults = this.getResults.bind(this);
        this.getPlayers = this.getPlayers.bind(this);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.getResults();
    }

    getResults() {
        this.addLoading();
        const { apiActions: { getResults } } = this.props;
        getResults().then(() => this.getPlayers());
    }

    getPlayers() {
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
        const { params, player } = this.props;

        return (
            <Grid>
                <Nav
                    params={params}
                />
                {loading ?
                    <Loading />
                    :
                    <Row>
                        <Col xs={12} className="no-padding-left no-padding-right">
                            <h4
                                className="
                                    margin-left
                                    margin-right
                                    padding-left-medium
                                    padding-right-medium
                                "
                            >
                                {player.name}
                            </h4>
                            <Divider />
                            <Table
                                selectable={false}
                                className=""
                            >
                                <TableHeader
                                    adjustForCheckbox={false}
                                    displaySelectAll={false}
                                >
                                    <TableRow
                                        selectable={false}
                                    >
                                        <TableHeaderColumn
                                            style={styles.question}
                                        >
                                            {'Spørsmål'}
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            style={styles.answer}
                                        >
                                            {'Svar'}
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            style={styles.point}
                                            tooltip="Poeng"
                                        >
                                            {'P'}
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    showRowHover
                                >
                                    {Object.keys(player.results).map((key) => (
                                        <TableRow
                                            key={key}
                                            selectable={false}
                                        >
                                            <TableRowColumn
                                                style={styles.question}
                                            >
                                                {key}
                                            </TableRowColumn>
                                            <TableRowColumn
                                                style={styles.answer}
                                            >
                                                {player.results[key]}
                                            </TableRowColumn>
                                            <TableRowColumn
                                                style={styles.point}
                                            >
                                                {player.points[key] && player.points[key]}
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Col>
                    </Row>
                }
            </Grid>
        );
    }
}

Player.propTypes = {
    params: PropTypes.object.isRequired,
    apiActions: PropTypes.object.isRequired,
    player: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        apiActions: bindActionCreators(apiActionCreators, dispatch)
    };
}

export default connect(
    (state, { params: { playerId } }) => ({ player: state.players.players[playerId] }),
    mapDispatchToProps
)(Player);
