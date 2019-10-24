import React, { Component } from 'react';
import AppWrapper from '../../containers/Navigation/AppWrapper/AppWrapper';

class Layout extends Component {
    // TODO: State of side drawer should live in redux for smoother UX
    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {

        return (
            <AppWrapper>
                <main >
                    {this.props.children}
                </main>
            </AppWrapper>
        );
    };
};

export default Layout;
