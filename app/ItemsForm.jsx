var React = require ('react');
var Bootstrap = require ('react-bootstrap');

//FORM THAT HANDLES USER INPUT AND ALLOWS A NEW ITEM TO BE ADDED TO THE ARRAY WITH HELP OF JQUERY
var ItemsForm = React.createClass ({
	submit: function (evt){
		evt.preventDefault();
		var newItem = $('#msg').val();
		var that = this;
		$.post('/ItemsArray', {
			newItem: newItem
		}, function (response){
			if (response == 'success'){
				that.props.getItems();
				$('#msg').val('');
			}
		}, 'text');
	}, 
	// REACT RENDERING OF THE ITEMS ONTO THE PAGE
	render: function (){
		return (
			   <div className="row">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="text" name="msg" id="msg" className="form-control"></input>
                        </div>
                       <div className="Item-Submit">
                        <div className="col-sm-2">
                            <input type="submit" value="Add New Item" className="btn"></input>
                        </div>
                       </div>
                    </div>
                </form>
            </div>
		);
	}
});

module.exports = ItemsForm;