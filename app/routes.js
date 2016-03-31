var Actor = require('./models/actor');
var Agent=require('./models/agent');
var Secondrole=require('./models/secondrole');
var Verb=require('./models/verb');
var SourceDictionary=require('./models/sourceDictionary');
var Car=require('./models/car');


function getAllVerbs(res){
	Verb.find(function(err,verbs){
		if(err)
			res.send(err)
		res.json(verbs);
	});
}

function getAllCountryActors(res){
	Actor.find(function(err,actors){
		if(err)
			res.send(err)
		res.json(actors);
	});
}

function getAllAgentActors(res){
	Agent.find(function(err,agents){
		if(err)
			res.send(err)
		res.json(agents);
	});
}
function getAllSecondroleActors(res){
	Secondrole.find(function(err,secondrole){
      if(err)
      	res.send(err)
      res.json(secondrole);
	});
}

module.exports = function(app) {

	// api ---------------------------------------------------------------------
    app.get('/api/verbs', function(req,res){
		getAllVerbs(res);
	})
	
	//get all country actors
	app.get('/api/actors', function(req,res){
		getAllCountryActors(res);
	})
		app.get('/api/agents', function(req,res){
		getAllAgentActors(res);
	})
	   app.get('/api/secondroles', function(req,res){
		getAllSecondroleActors(res);
	})

	//create new country actor
	app.post('/api/actors',function(req,res){
		Actor.create({
			name:req.body.text,

		},function(err){
			if(err)
				res.send(res);
		});
	});
	app.post('/api/carExample',function(req,res){
		//Car.create()
		Car.create({
			name:req.body.name,
			car:req.body.car

		},function(err){
			if(err)
				res.send(res);
		});

	});
    //post source form
	app.post('/api/addSourceDictionary',function(req,res){
		//Car.create()
		SourceDictionary.create({
		/*	name:req.body.name,
			car:req.body.car*/
		   word: req.body.name,
	       countryCode:req.body.countryCode,
	       firstRoleCode:req.body.firstRoleCode,
	       secondRoleCode:req.body.secondRoleCode,
	       dateStart:req.body.dateStart,
	       dateEnd:req.body.dateEnd,
	       confidenceFlag:req.body.confidenceFlag,
	       userId:req.user.id   //the id property is lower case on user

		
		});
		//need to put this end here when making a post request.
		res.end();

	});
	app.get('/summaryTable',function(req,res){
		res.send({"name":"Hello Yan Liang"});
		res.end();
	})
	/*app.post('/view1', function(req, res) {
    console.log(req.body.desc);
    res.end();*/
/*});*/
/*	app.get('/api/test',function(req,res){
	  
        res.send({"user:":req.user.id});
	});*/

	//this is for getting the partial view
	/*app.get('/partialTest',function(req,res){
      res.sendfile('./public/partials/testPartial.html');
	});*/
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};