var React = require ('react');
var Bootstrap = require ('react-bootstrap');

var PictureComponent = React.createClass ({
	render: function (){
		return (
			<div className= "panel panel-success">
					<div className="panel-body">
						<div className="items">
							<h3>{this.props.data.img}</h3></div>
								<div className="postedOn">
							<p> this picture was added on {this.props.data.date}</p>
								</div>
								<div className="id hidden">{this.props.data.Iid}</div>								
					</div>
			</div>
		);
	}
});

module.exports = PictureComponent;