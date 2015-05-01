var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello World!' })
});

/* GET userlist page */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET new user page */
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User' })
});

/* POST to add a new user */
router.post('/adduser', function(req, res) {

	// set internal DB variable
	var db = req.db;

	// get form values (relying on 'name' attributes)
	var userName = req.body.username;
	var userEmail = req.body.username;

	// set ythe collection
	var collection = db.get('usercollection');

	// submit to the database
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, doc) {
		if (err) {
			// return error if it fails
			res.send("There was a problem adding your information to the database.")
		}
		else {
			// if successful, remove /adduser from the headbar
			res.location("userlist");
			// and forward to the success page
			res.redirect("userlist");
		}
	});
});






module.exports = router;











