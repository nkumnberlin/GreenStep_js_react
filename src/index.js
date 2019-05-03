import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './js/components/menubar/MenuBar.js';
import Footer from './js/components/footer/Footer.js';
import  Results from './js/components/result/Result.js';
import Search from './js/components/search/Search.js';
import './style.css'

ReactDOM.render(<MenuBar />, document.getElementById('header'));
ReactDOM.render(<Search />, document.getElementById('search'));
//ReactDOM.render(<Title />, document.getElementById('title'));
ReactDOM.render(<Results />, document.getElementById('results'));
ReactDOM.render(<Footer />, document.getElementById('footer'));