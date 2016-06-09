;
(function () {

	"use strict";

	var fs = require('fs');
	var express = require('express');
	var expressSession = require('express-session');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var uuid = require('node-uuid');
	var mongoose = require('mongoose');
	var config = require('./config.js');
	var Item = require('./ItemSchema.js');
	var Picture = require('./PictureSchema.js');
	var Multer = require ('multer');
  var upload = Multer({ dest: 'uploads/' });

	var app = express();
	var PORT = 3000;

	// THIS CONNECTS MONGODB TO OUR LOCAL HOST
	mongoose.connect('mongodb://localhost');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(cookieParser());
	app.use(expressSession({
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
	}));


app.post('/pictures/upload', upload.array('itemPictures', 5), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var pictureUpload = upload.fields([{ name: 'itemPictures', maxCount: 5 }])
app.post('/pictures', pictureUpload, function (req, res, next) {
  if (!req.body.newPicture) {
			res.send("item error");
			return;
		}
})

	app.get("/ItemsArray", function (req, res) {
		//SEARCHES ITEM DATABASE FOR THE SELECTED ITEM ID AND RETURNS ALL VALUES MATCHING
		Item.find({}, "text Iid date", function (err, data) {
			if (err) {
				res.send("[targetitemfinderror]");
				return;
			}
			res.send(JSON.stringify(data));
		});
	});
	app.get("/OneItem", function (req, res) {
		console.log(req.query.Iid);
		Item.findOne({Iid:req.query.Iid}, "text Iid date", function (err, data) {
			if (err) {
				res.send("[targetitemfinderror]");
				return;
			}
			res.send(JSON.stringify(data));
		});
	});
	//POSTS NEW PICTURES TO A SPECIFIC ITEM PAGE, USING THE ID AS THE ITEM IDENTIFIER
	app.post("/ItemsArray", function (req, res) {
		if (!req.body.newItem) {
			res.send("item error");
			return;
		}

		var item = new Item({
			text: req.body.newItem,
			//			username: req.session.username,
			Iid: uuid.v4(),
			date: new Date(),
		});
		// SAVES OR DELETES THE NEW CONSTRUCTOR TO THE DATABASE
		item.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send("success");
		});
	});
	
app.delete('/ItemsArray/:id', function(req, res) {
  if(!req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No item found');
  }  

Item.remove({Iid: req.params.id}, function (err, thing){
	if (err){
		console.log (err);
	}
	 console.log (thing);
});
	console.log(req.params.id);
  res.json(true);
});
	

	app.get("/itemPictures", function (req, res) {

		//SEARCHES PICTURE DATABASE FOR THE SELECTED ITEM ID AND RETURNS ALL VALUES MATCHING
		Picture.find({
			Iid: req.query.Iid
	  }, "img text Iid date", function (err, data) {
			if (err) {
				res.send("[targetitemfinderror]");
				return;
			}
			console.log(data);
			res.send(JSON.stringify(data));
		});
	});

	//POSTS NEW PICTURES TO A SPECIFIC ITEM PAGE, USING THE ID AS THE ITEM IDENTIFIER
	app.post("/itemPictures", function (req, res) {
		console.log("Hello");
		if (!req.data.newPicture) {
			res.send("picture error");
			return;
		}
		// DATABASE CONSTRUCTOR THAT PASSES IN THE PICTURE ID AND THE CURRENT TIME
		var picture = new Picture({
			img: { data: Buffer, contentType: String }, 
			text: req.data.newPicture,
			//			username: req.session.username,
			Iid: req.query.Iid,
			date: new Date(),
		});
		console.log(picture);
		//STORES DATA THE THE PICTURE ENTITY IN THE DATABASE
		Picture.save(function (err) {
			if (err) {
				res.send("save error");
				return;
			}
			res.send("success");
		});
	});
	// EXPRESS PUBLIC FOLDER SERVER
	app.use(express.static('public'));

	app.use(function (req, res, next) {
		res.status(404);
		res.send("File Not Found");
	});
	// APP LISTENER TO SET THE PORT AND LOGS THE START OF THE SERVER
	app.listen(PORT, function () {
		console.log("server started on port " + PORT);
	});

}());