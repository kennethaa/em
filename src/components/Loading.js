import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Row>
                <Col xs={12} className="text-center">
                    <CircularProgress size={this.props.size} />
                </Col>
            </Row>
        );
    }
}

Loading.defaultProps = {
    size: 1
};

Loading.propTypes = {
    size: PropTypes.number.isRequired
};

export default Loading;
