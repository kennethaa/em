import React, { Component, PropTypes } from 'react';

import './App.scss';

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    params: PropTypes.object.isRequired
};

export default App;
