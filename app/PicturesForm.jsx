var React = require ('react');
var FileInput = require ('react-file-input'); //THIS ALLOWS US TO UPLOAD IMAGES
var Bootstrap = require ('react-bootstrap');


//FORM THAT TAKES USER INPUT AND ALLOWS A NEW PICTURE TO BE ADDED TO THE ARRAY WITH JQUERY
var PicturesForm = React.createClass ({
	submit: function (evt){
		evt.preventDefault();
		var newPicture =  $('#image').val();
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
			<div className="row">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <div className="col-sm-6 col-sm-offset-2">
													<FileInput 
														   	 id= "image"
															   name="uploadImage"
																 accept=".png,.jpg"
																 placeholder="Upload Image"
																 className="inputClass" />
																 <div className="col-sm-3">
                        </div>
									</div>
							</div>
				</form>
			</div>
		)},
});
  

module.exports = PicturesForm;