var Actor = require('./models/actor');
var Agent=require('./models/agent');
var Secondrole=require('./models/secondrole');
var Verb=require('./models/verb');
var SourceDictionary=require('./models/sourceDictionary');
var User=require('./models/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId

function getAllVerbs(res){
	Verb.find(function(err,verbs){
		if(err)
			res.send(err)
		res.json(verbs);
	});
}
function getSourceDictionary(res){
	SourceDictionary.find(function(err,sourcedictionary){
		if(err)
			res.send(err)
		res.json(sourcedictionary);
	})
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
       app.get('/api/sourcedictionary', function(req,res){
		getSourceDictionary(res);
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
    //post source form
	app.post('/api/addSourceDictionary',function(req,res){
		/*console.log("start date: "+req.body.dateStart);*/
		if(req.body.dateStart==="")
		{
			req.body.dateStart=new Date("1800-01-01");
		}
		if(req.body.dateEnd==="")
		{
			req.body.dateEnd=new Date("1800-01-01");
		}
	/*	var userName="";
		User.find({'_id':ObjectId(req.user.id),'userid':req.user.id},function(err,data){
                 userName=data.username;
                 console.log("this is the user name : "+userName);*/

           SourceDictionary.create({
		   word: req.body.word,
	       countryCode:req.body.countryCode,
	       firstRoleCode:req.body.firstRoleCode,
	       secondRoleCode:req.body.secondRoleCode,
	       dateStart:req.body.dateStart,
	       dateEnd:req.body.dateEnd,
	       confidenceFlag:req.body.confidenceFlag,
	       userId:req.user.id,   //the id property is lower case on user
	      /* userName:userName*/
		});
		//need to put this end here when making a post request.
		res.end();
		/*});*/
		/*console.log("this is the user name "+req.user.id);*/

		

	});
	app.get('/summaryTable',function(req,res){
		var queryword=req.param('queryword');
		SourceDictionary.find({'word':queryword}, function(err, data){
		       //console.log(">>>> " + data );
		       //dynamically add user name
	
		      res.render('./summaryTable.jade',{sourcedictionary:data});
		     
		    });
       
	})

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};