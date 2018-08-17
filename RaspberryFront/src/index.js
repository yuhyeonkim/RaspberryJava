import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import LoginForm from './components/Login';
//import Home from './components/Home';
//import FoodMenu_Image from './components/FoodMenu_Image';
//import ManagerMain from './components/ManagerMain';


import BoardManager from './components/BoardManager';

//ReactDOM.render(<LoginForm />, document.getElementById('root'));
ReactDOM.render(<BoardManager />, document.getElementById('root'));
registerServiceWorker();
