import React, { Component } from 'react';

/**
 * A component that will load itself asynchronously when called upon.
 * @param {*} importComponent 
 */
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        };

        render() {
            const LazyComponent = this.state.component;
            return LazyComponent ? <LazyComponent {...this.props} /> : null;
        };
    };
};

export default asyncComponent;