import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';

class PlayersList extends Component {
    render() {
        const { playersByRank } = this.props;

        return (
            <Row>
                <Col xs={12} className="no-padding-left no-padding-right">
                    <List>
                        {playersByRank.map((player) =>
                            (
                            <Link
                                key={player._id}
                                to={`/player/${player._id}`}
                            >
                                <ListItem>
                                    {player.info['Fullt navn']}
                                </ListItem>
                            </Link>
                            )
                        )}
                    </List>
                </Col>
            </Row>
        );
    }
}

PlayersList.propTypes = {
    params: PropTypes.object.isRequired,
    playersByRank: PropTypes.array.isRequired
};

export default PlayersList;
