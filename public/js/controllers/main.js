var app=angular.module('mainServiceModule', ['720kb.datepicker']);
  app.factory('Actors', ['$http',function($http) {
 		return {
 			get : function() {
 				return $http.get('/api/actors');
 			}
 		/*	create : function(todoData) {
 				return $http.post('/api/todos', todoData);
 			},
 			delete : function(id) {
 				return $http.delete('/api/todos/'  id);
 			}*/
 		}
 	}]);
 	app.factory('Agents', ['$http',function($http) {
 		return {
 			get : function() {
 				return $http.get('/api/agents');
 			}
 		}
 	}]);
 	app.factory('Secondroles', ['$http',function($http) {
 		return {
 			get : function() {
 				return $http.get('/api/secondroles');
 			}
 		}
 	}]);
 	app.factory('Verbs', ['$http',function($http) {
 		return {
 			get : function() {
 				return $http.get('/api/verbs');
 			}
 		}
 	}]);

	// inject the Todo service factory into our controller
	app.controller('mainController', ['$scope','$http','$location','Actors','Agents','Secondroles','Verbs','AuthService', function($scope,$http,$location,Actors,Agents,Secondroles,Verbs,AuthService) {
		//date picker
		  $scope.myDate = new Date();

		  $scope.minDate = new Date(
		      $scope.myDate.getFullYear(),
		      $scope.myDate.getMonth() - 2,
		      $scope.myDate.getDate());

		  $scope.maxDate = new Date(
		      $scope.myDate.getFullYear(),
		      $scope.myDate.getMonth() + 2,
		      $scope.myDate.getDate());
		  
		  $scope.onlyWeekendsPredicate = function(date) {
		    var day = date.getDay();
		    return day === 0 || day === 6;
		  }


		$scope.signmeOut=function()
		{
	      // call logout from service
	      AuthService.logout()
	        .then(function () {
	          $location.path('/login');
	        });
		};


	  	Actors.get()
		   .success(function(data){
              
               $scope.loading=false;
               $scope.actordata={
               	availableOptions:data,
               	selectedOption:data[0].name
               }

		   });
		Agents.get()
		   .success(function(data){
              
               $scope.loading=false;
               $scope.agentdata={
               	availableOptions:data,
               	selectedOption:data[0].name
               }

		   });
	   	Secondroles.get()
	     .success(function(data){
          
           $scope.loading=false;
           $scope.secondroledata={
           	availableOptions:data,
           	selectedOption:data[0].name
           }

	   });

		Verbs.get()
		    .success(function(data){
              $scope.loading=false;
              $scope.verbdata={
              	availableOptions:data,
              	selectedOption:data[0].name
              }
		    });  
/**********source Form***************************************/

$scope.sourceForm={};
$scope.sourceForm.word="";
$scope.sourceForm.country="";
$scope.sourceForm.rolefirst="";
$scope.sourceForm.rolesecond="";
$scope.sourceForm.startdate="";
$scope.sourceForm.enddate="";
$scope.sourceForm.sourceflag="";


$scope.sourceForm.submitSourceForm=function(item,event){
	console.log("-->submit source form");
	var sourceDicObject={
       word: $('#sourceWord').val(),
       //this is they way to go there is bug in combobox auto complete use jquery directly
       countryCode:$('#combobox0input').val(), //countryCode
       firstRoleCode:$('#combobox1input').val(), //firstRoleCode
       secondRoleCode:$('#combobox2input').val(),//secondRoleCode
       dateStart:$scope.sourceForm.startdate,
       dateEnd:$scope.sourceForm.enddate,
       confidenceFlag:$('#sourceflag').val()
       //get the useId from the req in api.
	};
	var responsePromise = $http.post("/api/addSourceDictionary", sourceDicObject);
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log("Submitting source form is successful!");
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting source form failed!");
       });
}

/**********end of source Form***************************************/

/*****************verb form********************************************/
$scope.verbForm={};
$scope.verbForm.submitVerbForm=function(item,event){
    var verbDicObject={
      word:$('#verbword').val(),
     verbcode:$('#combobox6input').val(),
     confidenceFlag:$('#verbflag').val()
    };

      var responsePromise = $http.post("/api/addVerbDictionary", verbDicObject);
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log("Submitting verb form is successful!");
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting verb form failed!");
       }); 
}


/************end of verb form*******************************************/

/**********target Form***************************************/

$scope.targetForm={};
$scope.targetForm.word="";
$scope.targetForm.country="";
$scope.targetForm.rolefirst="";
$scope.targetForm.rolesecond="";
$scope.targetForm.startdate="";
$scope.targetForm.enddate="";
$scope.targetForm.targetflag="";


$scope.targetForm.submitTargetForm=function(item,event){
  console.log("-->submit source form");
  var sourceDicObject={
       word: $('#targetWord').val(), 
       //this is they way to go there is bug in combobox auto complete use jquery directly
       countryCode:$('#combobox3input').val(), //countryCode
       firstRoleCode:$('#combobox4input').val(), //firstRoleCode
       secondRoleCode:$('#combobox5input').val(),//secondRoleCode
       dateStart:$scope.sourceForm.startdate,
       dateEnd:$scope.sourceForm.enddate,
       confidenceFlag:$('#targetflag').val()
       //get the useId from the req in api.
  };
  //targetDictionary and sourceDictionary share the same schema.
  var responsePromise = $http.post("/api/addSourceDictionary", sourceDicObject);
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log("Submitting source form is successful!");
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
      });
}

/**********end of target Form***************************************/



/****************test section***************************/



/***************end of test section**************************/



	}]);


