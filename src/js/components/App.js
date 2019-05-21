import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './menubar/MenuBar.js';
import Footer from './footer/Footer.js';
import Results from './result/Result.js';
import Title from './title/Title.js';
import '../../style.css'
import LocationSearchInput from "./search/Search.js";
import PythonResponse from "./python_endpoint/PythonResponse.js"
import DestinationInput from "./python_endpoint/DestinationInput.js"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import ReactDOM from "react-dom";


export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route path='/' exact component={PythonResponse}/>
                </Router>
                <MenuBar/>
                <Title/>
                <LocationSearchInput/>
                <Results/>
                <Footer/>
            </div>
        )
    }
}
