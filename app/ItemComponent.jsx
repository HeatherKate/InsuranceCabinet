var React = require ('react');
var Link = require ('react-router').Link;

var ItemComponent = React.createClass ({
	render: function (){
		return (
		<div className="container">
			<div className= "panel panel-default">
					<div className="pictures"></div>
						<div className="items">
							<h3><Link to={"/pictures/" + this.props.data.Iid}>{this.props.data.text}</Link></h3></div>
							<div className="delete-button">
								<div className = "btn btn-warning" onClick={this._deleteItem}>Delete</div> </div>		
								<div className="postedOn">
							<p2> this item was added on {this.props.data.date}</p2>
								</div>
						<div className="ID hidden">{this.props.data.Iid}</div>
			
		</div>
			</div>
		);
	}, 
	_deleteItem: function (){
		this.props.deleteItem(this.props.data.Iid);
	}
});



module.exports = ItemComponent;