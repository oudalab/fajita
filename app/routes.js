var Actor = require('./models/actor');
var Agent=require('./models/agent');
var Secondrole=require('./models/secondrole');
var Verb=require('./models/verb');
var SourceDictionary=require('./models/sourceDictionary');
var VerbDictionary=require('./models/verbDictionary');
var User=require('./models/user');
var Sentence=require('./models/sentence');
var SentenceTaggingResult=require('./models/sentenceTaggingResult');
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
    app.post('/api/addSentenceTaggingResult',function(req,res){
      if(req.body.sourceStartDate==="")
		{
			req.body.sourceStartDate=new Date("1800-01-01");
		}
		if(req.body.sourceEndDate==="")
		{
			req.body.sourceEndDate=new Date("1800-01-01");
		}

		 if(req.body.targetStartDate==="")
		{
			req.body.targetStartDate=new Date("1800-01-01");
		}
		if(req.body.targetEndDate==="")
		{
			req.body.targetEndDate=new Date("1800-01-01");
		}
      SentenceTaggingResult.create({
      	sentenceId:req.body.sentenceId,
      	sourceCountryCode:req.body.sourceCountryCode,
      	sourceFirstroleCode:req.body.sourceFirstroleCode,
      	sourceSecondroleCode:req.body.sourceSecondroleCode,
      	sourceStartDate:req.body.sourceStartDate,
      	sourceEndDate:req.body.sourceEndDate,
      	verbCode:req.body.verbCode,
      	targetCountryCode:req.body.targetCountryCode,
      	targetFirstroleCode:req.body.targetFirstroleCode,
      	targetSecondroleCode:req.body.targetSecondroleCode,
      	targetStartDate:req.body.targetStartDate,
      	targetEndDate:req.body.targetEndDate,
      	userId:req.user.id
      },function(err,data){
      	if(err)
      		console.error(err);
      	else
      	{
      		res.end();
      	}
      });
      /*console.log("the sentence has been posted!");*/
     /* res.end();*/
   
    });
 
    //finally figure out this is the correct way in mongoose and express to update data.
    app.post('/updateSentenceTag',function(req,res){
      
     //make the tag of the sentence to be 1 when commit the whole sentence tagging
     Sentence.findOneAndUpdate({_id:req.body.sentenceId},{$set:{tagged:1}},function(err,sentence){
       
       });
      res.end();
    });

    //to get the current sentence object, in order to make sure when we click the next sentence, the current sentence already get commited.
    app.post('/getCurrentSentence',function(req,res){
        var sentenceId=req.body.currentSentenceId;
        Sentence.find({'_id':sentenceId},function(err,data){
          res.json(data);
        });
       // res.end();
    });

	app.get('/summaryTable',function(req,res){
		var queryword=req.param('queryword');
		SourceDictionary.find({'word':queryword}, function(err, data){
		       //console.log(">>>> " + data );
		       //dynamically add user name
	
		      res.render('./summaryTable.jade',{sourcedictionary:data});
		     
		    });
       
	});
	//this is to get the total sourceDictionary tagging for this student
	app.get('/getSourceTaggingCountForCurrentUser',function(req,res){
       
      SourceDictionary.find({'userId':req.user.id},function(err,data){
      	res.json(data.length);
      	//console.log(data.length);
      	res.end();
      });
      //by the way if you put res.end() here it will end the res immedaitely and callbacs res.json might try to change res, so it will give u an error 
	})
	//get the total verb tagging for current student
	app.get('/getVerbTaggingCountForCurrentUser',function(req,res){
      VerbDictionary.find({'userId':req.user.id},function(err,data){
       res.json(data.length);
       res.end();
      });
	})
	//get the total sentence tagging for current student
    app.get('/getSentenceTaggingCountForCurrentUser',function(req,res){
    	SentenceTaggingResult.find({'userId':req.user.id},function(err,data){
         res.json(data.length);
         res.end();
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