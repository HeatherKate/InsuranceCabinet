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
		
		var imageHTML = null;
		
		if (this.state.OneItem){
			
			if (this.state.OneItem.Iid == "e5eca137-079a-4e17-b2eb-ccbce87f811c"){
			imageHTML = <img src = "../Images/television.JPG" className="images"></img>
		} else if (this.state.OneItem.Iid == "1ae9b362-ffef-4f73-9c35-5388bcdb75ce"){
			imageHTML = <img src = "../Images/kayaks.jpg" className="images"></img>
		} else if (this.state.OneItem.Iid == "21318df1-d924-4bbf-92b9-426937bb5a35"){
			imageHTML = <img src = "../Images/dvds.jpg" className="images"></img>
		} else if (this.state.OneItem.Iid == "10434104-3cad-4c69-a7a9-b0d50719142c"){
			imageHTML = <img src = "../Images/couch.jpg" className="images"></img>
		} else if (this.state.OneItem.Iid == "8c781eb9-2e10-4867-bbbb-eb4b7195327b"){
			imageHTML = <img src = "../Images/macbook.png" className="images"></img>
		} else if (this.state.OneItem.Iid == "ea8a3a97-f799-44c1-8b05-488c3ffc4262"){
			imageHTML = <img src = "../Images/delete.png" className="images"></img>
		} 
			
		}

		// THIS DISPLAYS A SELECTED ITEM AND THE ID PLUS THE PICTURE FORM AND ALL PICTURES RELATED TO THAT ID
		return (
		<div>
			{picturesHTML}
			{itemHTML}
			<PicturesForm getPictures={this.getPictures}/>
			{imageHTML}				
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
