var React = require ('react');
var Link = require ('react-router').Link;

var ItemComponent = React.createClass ({
	render: function (){
		return (
		<div className="container">
			<div className= "panel panel-success">
					<div className="pictures"></div>
						<div className="items">
							<h3><Link to={"/pictures/" + this.props.data.Iid}>{this.props.data.text}</Link></h3></div>
								<div className="postedOn">
							<p> this item was added on {this.props.data.date}</p>
								</div>
						<div className="ID hidden">{this.props.data.Iid}</div>
			 </div>		
		</div>
		);
	}
});

module.exports = ItemComponent;