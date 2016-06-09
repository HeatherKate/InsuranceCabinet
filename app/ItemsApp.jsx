var React = require ('react');
var Bootstrap = require ('react-bootstrap');
var ItemComponent = require ('./ItemComponent.jsx');
var ItemsForm = require ('./ItemsForm.jsx');

// VAR ITEMSAPP COMPONENT HANDLES CREATING AND RENDERING THE ITEMS TO THE PAGE
var ItemsApp = React.createClass ({
	render: function () {
		var ItemsHTML = [];
		
		for (var i=0; i< this.state.ItemsArray.length; i++){
			ItemsHTML.push(<ItemComponent key={i} data={this.state.ItemsArray[i]} deleteItem={this.deleteItem}/>);
		}
		ItemsHTML.reverse();
		// RENDERS THE ITEMS FORM AND ALL PREVIOUSLY SUBMITTED ITEMS
		return (<div>
			<ItemsForm getItems={this.getItems}/>
			<br />
			{ItemsHTML}
		</div>);
	},

	// SETS THE STATE OF ITEMS TO AN EMPTY ARRAY
	getInitialState: function(){
		var stateObj = {
			ItemsArray: [],
		};
		return stateObj;
	},

	// JQUERY TO GET ALL ITEMS WHEN THE PAGE LOADS AND WHEN GETITEMS IS CALLED
	getItems: function() {
		var that = this;
		// JQUERY TO GET /ITEMS AND UPDATE THE STATE ITEMS WITH ALL RESULTS
		$.get('/ItemsArray', function(result) {
			that.setState({
				ItemsArray: result
			});
		}, 'json');
	},
	
	deleteItem: function (Iid){
		var ItemsArray = this.state.ItemsArray;
		
		for (var i=0; i< ItemsArray.length; i++){
			if ( ItemsArray[i].Iid == Iid) {
			ItemsArray.splice(i,1);
      this.setState({
        ItemsArray: ItemsArray
				});
			}
		}
		$.ajax({
			url: "/ItemsArray/" + Iid,
			type: "DELETE"
		})
	},
	


	
	// WHEN THE PAGE MOUNTS, TELLS REACT TO GETITEMS
	componentDidMount: function() {
		this.getItems();
	}
});

module.exports = ItemsApp;
