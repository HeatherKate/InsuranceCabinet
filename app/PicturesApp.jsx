var React = require("react");
var Bootstrap =  require('react-bootstrap');
var PictureComponent = require("./PictureComponent.jsx");
var PicturesForm = require('./PicturesForm.jsx');
var ItemComponent = require('./ItemComponent.jsx');

//REACT COMPONENT THAT RENDERS THE SELECTED ITEM, AND DISPLAYS ANY ASSOCIATED PICTURES TIED TO THE ITEM
var PicturesApp = React.createClass({
	render: function() {
		var picturesHTML = [];
		var itemHTML = null;

		if(this.state.OneItem) {
			itemHTML = <ItemComponent data={this.state.OneItem} />
		}
		// LOOPS THROUGH ALL ITEMS WITH A MATCHING ID AND CONVERTS THEM TO HTML
		for(var i = 0; i < this.state.itemPictures.length; i++){
			picturesHTML.push(<PictureComponent key={i} data={this.state.itemPictures[i]} />);
			
		}
		picturesHTML.reverse();
		// THIS DISPLAYS A SELECTED ITEM AND THE ID PLUS THE PICTURE FORM AND ALL PICTURES RELATED TO THAT ID
		return (
		<div>
			{picturesHTML}
			{itemHTML}
			<PicturesForm getPictures={this.getPictures}/>
		</div>);
	},

	// SET INITIAL STATE OF ITEMS AND ANY PICTURES
	getInitialState: function(){
		var stateObj = {
			itemPictures: [],
			OneItem: null
		};
		return stateObj;
	},
	// GETS THE ITEM WHEN THE PAGE LOADS
	getOneItem: function() {
		var that = this;
		$.get('/OneItem', {Iid: this.props.params.Iid}, function(result) {
//			console.log(result);
			that.setState({
				OneItem: result
			});
		}, 'json');
	},

	//GETS ALL PICTURES, IF ANY, WHEN THE PAGE LOADS, USING THE SAME ITEM PARAMETER PASSED INTO THE URL AND DOWN INTO THE PAGE
	getPictures: function() {
		var that = this;
		$.get('/itemPictures', {Iid: this.props.params.Iid}, function(result) {
			console.log(result, "forgot");
			that.setState({
				itemPictures: result
			});
		}, 'json');
	},

	// WHEN THE PAGE MOUNTS, GETS ITEMS AND RELATED PICTURES
	componentDidMount: function() {
		this.getOneItem();
		this.getPictures();
	}
});

module.exports = PicturesApp;
