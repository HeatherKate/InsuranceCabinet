var React = require ('react');
var FileInput = require ('react-file-input'); //THIS ALLOWS US TO UPLOAD IMAGES
var Bootstrap = require ('react-bootstrap');


//FORM THAT TAKES USER INPUT AND ALLOWS A NEW PICTURE TO BE ADDED TO THE ARRAY WITH JQUERY
var PicturesForm = React.createClass ({
	submit: function (evt){
		evt.preventDefault();
		var newPicture =  $('#image').val();
		console.log(newPicture);
		var that = this;
		$.post('/itemPictures', {
			img: newPicture,
		}, function (response){
			if (response == 'success'){
				that.props.getPictures();
			}
		}, 'text');
	}, 
	// REACT RENDERING OF THE PICTURES ONTO THE PAGE
 render: function() {
    return (
			<div className="rowTwo">
                <form onSubmit={this.submit}>
                    <div className="col-sm-2">
													<FileInput 
														   	 id= "image"
															   name="uploadImage"
																 accept=".png,.jpg"
																 placeholder="Upload Image"
																 className="inputClass" />
										</div>
									<div className="col-sm-9 col-sm-offset-1">
									 <div className= "btn btn-success"> Submit Image </div>
									</div>
							</form>
				</div>
		)},
});
  

module.exports = PicturesForm;