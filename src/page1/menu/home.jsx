
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const styles = {

}

class home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props)
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div>我是page1</div>
        )
    }
}


export default home;