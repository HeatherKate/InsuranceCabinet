var React = require ('react');
var Bootstrap = require ('react-bootstrap');

var PictureComponent = React.createClass ({
	render: function (){
		return (
			<div className= "panel panel-success">
					<div className="panel-body">
						<div className="items">
							<h3>{this.props.data}</h3></div>
							
							 <img src = "../Images/television.JPG" className = "images"></img>
								<div className="postedOn">
							<p> this picture was added on {this.props.data.date}</p>
								</div>
								</div>
								<div className="id hidden">{this.props.data.Iid}</div>	
			</div>
		);
	}
});

module.exports = PictureComponent;