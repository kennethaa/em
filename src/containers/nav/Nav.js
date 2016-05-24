import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib';
import AppBar from 'material-ui/AppBar';
import { TITLE } from '../../constants';

class Nav extends Component {
    constructor(props, context) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { router: { push } } = this.context;
        push('/');
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} className="no-padding-left no-padding-right">
                        <AppBar
                            title={TITLE}
                            onLeftIconButtonTouchTap={this.onClick}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

Nav.contextTypes = {
    router: PropTypes.object.isRequired
};

Nav.propTypes = {
    params: PropTypes.object.isRequired
};

export default Nav;
