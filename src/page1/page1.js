//page1
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Home from './menu/home'//首页

class MainPage extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
            </Router>
        );
    }
}
const container = document.getElementById('app');
ReactDOM.render(<MainPage></MainPage>, container);