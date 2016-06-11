import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-flexbox-grid/lib';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

import {
    blue500,
    green500,
    red500
} from 'material-ui/styles/colors';

function getLeftIcon(i, length) {
    if (i === 0) return <SentimentVerySatisfied color={blue500} />;
    if (i > 0 && i <= 2) return <SentimentSatisfied color={green500} />;
    if (i === length - 1) return <SentimentVeryDissatisfied color={red500} />;

    return <SentimentNeutral color={'rgb(117, 117, 117)'} />;
}

class PlayersList extends Component {
    render() {
        const { playersByRank } = this.props;

        return (
            <Row>
                <Col xs={12} className="no-padding-left no-padding-right">
                    <FlatButton
                        label="Påmeldingsskjema"
                        primary
                        linkButton
                        href="http://goo.gl/forms/gsCOF58Ak0dBofiD3"
                        target="_blank"
                        className="margin"
                        disabled
                    />
                    <List>
                        {playersByRank.map((player, i) =>
                            (
                            <Link
                                key={player._id}
                                to={`/player/${player._id}`}
                            >
                                <Divider />
                                <ListItem
                                    primaryText={player.name}
                                    secondaryText={`${player.totalPoints} poeng`}
                                    leftIcon={
                                        <span>
                                            {getLeftIcon(i, playersByRank.length)}
                                        </span>
                                    }
                                    rightIcon={<ChevronRight />}
                                />
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
