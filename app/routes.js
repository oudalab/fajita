var Actor = require('./models/actor');
var Agent=require('./models/agent');
var Secondrole=require('./models/secondrole');
var Verb=require('./models/verb');
var SourceDictionary=require('./models/sourceDictionary');
var VerbDictionary=require('./models/verbDictionary');
var User=require('./models/user');
var Sentence=require('./models/sentence');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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
//only show the non-tagged sentences
function getOneNotTaggedSentence(res)
{
	Sentence.find(function(err,sentences)
	{
		if(err)
			res.send(err)
		var nottagged=sentences.filter(function(el){
			return el.tagged==0;
		})
		res.json(nottagged[0]);
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

           SourceDictionary.create({
		   word: req.body.word,
	       countryCode:req.body.countryCode,
	       firstRoleCode:req.body.firstRoleCode,
	       secondRoleCode:req.body.secondRoleCode,
	       dateStart:req.body.dateStart,
	       dateEnd:req.body.dateEnd,
	       confidenceFlag:req.body.confidenceFlag,
	       userId:req.user.id,   //the id property is lower case on user
	       userName:req.user.username //we can access the user name directly from the req.user object, not realize this previously.
	      /* userName:userName*/
		});
		//need to put this end here when making a post request.
		res.end();
		/*});*/
		/*console.log("this is the user name "+req.user.id);*/
	});
    app.post('/api/addVerbDictionary',function(req,res){
        
         VerbDictionary.create({
           word:req.body.word,
           verbcode:req.body.verbcode,
           confidenceFlag:req.body.confidenceFlag,
           userName: req.user.username,
           userId:req.user.id
         });
         res.end();
    });

    app.post('/updateSentenceTag/',function(req,res){
       
     
    });



	app.get('/summaryTable',function(req,res){
		var queryword=req.param('queryword');
		SourceDictionary.find({'word':queryword}, function(err, data){
		       //console.log(">>>> " + data );
		       //dynamically add user name
	
		      res.render('./summaryTable.jade',{sourcedictionary:data});
		     
		    });
       
	})

//this is for loop through the sentence
	app.get('/sentences',function(req,res){
       
      getOneNotTaggedSentence(res);
	})

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};