import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './menubar/MenuBar.js';
import Footer from './footer/Footer.js';
import Results from './result/Result.js';
import Title from './title/Title.js';
import '../../style.css'
import PythonResponse from "./python_endpoint/PythonResponse.js"
import Search from "./search/Search.js"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import PythonPost from "./python_endpoint/PythonPost.js";


export default class App extends Component {

    render() {
        return (
            <div>
                {/*<Router>*/}
                {/*    <Route path='/' exact component={PythonResponse}/>*/}
                {/*</Router>*/}
                <MenuBar/>
                <Title/>
                <Search/>
                <Results/>
                <Footer/>
            </div>
        )
    }

}
