/* global document, navigator */
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(registration => {
      console.log('sw registred scope:', registration.scope);
    })
    .catch(err => {
      console.log('sw registration failed:', err);
    });
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Chrome extends React.Component {
  constructor() {
    super();
    this.state = { isDrawerOpen: false };
  }

  openDrawer(open = true) {
    this.setState({ isDrawerOpen: open });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Fun App"
          onLeftIconButtonTouchTap={() => this.openDrawer()}
        />
        <div>
          {this.props.children}
        </div>
        <Drawer
          docked={false}
          open={this.state.isDrawerOpen}
          onRequestChange={open => this.openDrawer(open)}
        >
          <header style={{ padding: '20px 10px' }}>
            Top Menu
          </header>
          <MenuItem
            containerElement={<Link to="/" />}
            onTouchTap={() => this.openDrawer(false)}
          >
            Index
          </MenuItem>
          <MenuItem
            containerElement={<Link to="page1" />}
            onTouchTap={() => this.openDrawer(false)}
          >
            Page I
          </MenuItem>
          <MenuItem
            containerElement={<Link to="page2" />}
            onTouchTap={() => this.openDrawer(false)}
          >
            Page II
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

const Index = () => (
  <p>
    Index page
  </p>
);

const PageOne = () => (
  <p>
    Page I
  </p>
);

const PageTwo = () => (
  <p>
    Page II
  </p>
);


ReactDOM.render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Chrome}>
        <IndexRoute component={Index} />
        <Route path="page1" component={PageOne} />
        <Route path="page2" component={PageTwo} />
      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'));
