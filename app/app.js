var React = require ('react');
var Bootstrap = require ('react-bootstrap');
var ReactDom = require ('react-dom');
var Router = require ('react-router').Router;
var Route = require ('react-router').Route;
var browserHistory = require ('react-router').browserHistory;
var Link = require ('react-router').Link;
var ItemsApp = require ('./ItemsApp.jsx');
var PicturesApp = require ('./PicturesApp.jsx');

//TO MAKE SURE THE DOM KNOWS ABOUT REACT, BOOTSTRAP, AND OTHER PAGES

ReactDom.render ((
	<Router history = {browserHistory}>
	<Route path= "/" component = {ItemsApp}/>
	<Route path= "/pictures/:Iid" component = {PicturesApp}/>
	</Router>), document.querySelector('.app'));

