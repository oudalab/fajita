var app = angular.module('mainServiceModule', ['720kb.datepicker']);

app.directive('onFinishRender', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function() {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
});

app.factory('Actors', ['$http', function($http) {
  return {
    get: function() {
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
app.factory('Agents', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('/api/agents');
    }
  }
}]);
app.factory('Secondroles', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('/api/secondroles');
    }
  }
}]);
app.factory('Verbs', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('/api/verbs');
    }
  }
}]);

app.factory('Sentences', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('/sentences');
    },
    post: function(wordobject) {
      return $http.post('/getOneQuerySentence', wordobject);
    }

  }
}]);

// inject the Todo service factory into our controller
app.controller('mainController', ['$scope', '$http', '$location', 'Actors', 'Agents', 'Secondroles', 'Verbs', 'Sentences', 'AuthService', function($scope, $http, $location, Actors, Agents, Secondroles, Verbs, Sentences, AuthService) {
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


  $scope.signmeOut = function() {
    // call logout from service
    AuthService.logout()
      .then(function() {
        $location.path('/login');
      });
  };

  /**********source Form***************************************/

  $scope.sourceForm = {};
  $scope.sourceForm.word = "";
  $scope.sourceForm.country = "";
  $scope.sourceForm.rolefirst = "";
  $scope.sourceForm.rolesecond = "";
  $scope.sourceForm.startdate = "";
  $scope.sourceForm.enddate = "";
  $scope.sourceForm.sourceflag = "";
  //define the temp list that is going to submit for the whole sentences
  var sourceList = [];
  var targetList = [];


  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    //define a directive that will listen the ngRepeat finish event
    $('.sourceLink').click(function(e) {
      e.preventDefault();

      var value = $(this).text();
      $('#sourceWord').val(value);
      $('#sourceWord').select();
      $('#nouncommit').prop("disabled",false);
      //this still being called twice!!
      $http.post('/nounexist', {
        'word': value
      }).success(function(data) {
        var sourceword=$('#sourceWord').val();
         $('#sourceForm').trigger("reset");
         $('#sourceWord').val(sourceword);
        //just grab the useful info not all the 000zzz on the date format.
        if (data != null) {
          if (data.dateStart.substring(0, 10) != '1800-01-01') {
            $('#startdate').val(data.dateStart.substring(0, 10));

          } else {
           $('#startdate').val("");
          }

          if (data.dateEnd.substring(0, 10) != '1800-01-01') {
            $('#enddate').val(data.dateEnd.substring(0, 10));
          } else {
            $('#enddate').val("");
          }

          if (data.confidenceFlag) {
            $('#sourceflag').prop('checked', true);
          } else {
            $('#sourceflag').prop('checked', false);
          }
     
          $('#combobox0').val(data.countryCode);
          $('#combobox1').val(data.firstRoleCode);
          $('#combobox2').val(data.secondRoleCode);
          $('.custom-combobox:eq(0) .custom-combobox-input').val(data.countryCode);
          $('.custom-combobox:eq(1) .custom-combobox-input').val(data.firstRoleCode);
          $('.custom-combobox:eq(2) .custom-combobox-input').val(data.secondRoleCode);
                               
        } else {
            //do nothing since the form has been all cleared.
        }
      });

    });

    $('.verbLink').click(function(e) {
      e.preventDefault();
      $('#verbcommit').prop("disabled",false);
      $('#verbword').val($(this).text());
      $('#verbword').select();

    });
  });
  $scope.querygo = function() {
           //set all teh commit back to work;
        $("#sentencecommit").prop("disabled",false);
        $("#nouncommit").prop("disabled",false);
        $("#verbcommit").prop("disabled",false);
    Sentences.post({
      'word': $scope.queryword
    }).success(function(data) {
      if (data.output == "notfound") {
        alert("no sentence with the key word " + $scope.queryword + " found in the system!");
      } else {
        $scope.wholeSentence = data.wholeSentence;
        $scope.sentenceSource = data.actor;
        $scope.sentenceVerb = data.verb;
        $scope.sentenceTarget = data['target'];
        $scope.currentSentenceId = data._id;
 
      }

    });
  }
  $scope.nextSentence = function() {
          //set all teh commit back to work;
        $("#sentencecommit").prop("disabled",false);
        $("#nouncommit").prop("disabled",false);
        $("#verbcommit").prop("disabled",false);
    Sentences.get()
      .success(function(data) {
        $scope.wholeSentence = data.wholeSentence;
        $scope.sentenceSource = data.actor;
        $scope.sentenceVerb = data.verb;
        $scope.sentenceTarget = data['target'];
        $scope.currentSentenceId = data._id;
  

      });
  }

//Post.find().sort([['updatedAt', 'descending']]).all(function (posts) {
  //define a comparator
  var datacomparator=
   function compare(a,b) {
        if (a.id < b.id)
          return -1;
        if (a.id > b.id)
          return 1;
        return 0;
      };
    Actors.get()
    .success(function(data) {
      data.sort(datacomparator);
      $scope.loading = false;
      $scope.actordata = {
        availableOptions: data,
        selectedOption: data[0].name
      }
    });

  Agents.get()
    .success(function(data) {
      data.sort(datacomparator);
      $scope.loading = false;
      $scope.agentdata = {
        availableOptions: data,
        selectedOption: data[0].name
      }

    });
  Secondroles.get()
    .success(function(data) {
      data.sort(datacomparator);
      $scope.loading = false;
      $scope.secondroledata = {
        availableOptions: data,
        selectedOption: data[0].name
      }

    });

  Verbs.get()
    .success(function(data) {
      $scope.loading = false;
      $scope.verbdata = {
        availableOptions: data,
        selectedOption: data[0].name
      }
    });

  Sentences.get()
    .success(function(data) {
      $scope.wholeSentence = data.wholeSentence;
      $scope.sentenceSource = data.actor;
      $scope.sentenceVerb = data.verb;
      $scope.currentSentenceId = data._id;
    });


  $scope.sourceForm.submitSourceForm = function(item, event) {

    var flagged = false;
    if ($('#sourceflag').prop("checked")) {
      flagged = true;
    }
    if ($("input:radio[name='inlineRadioOptions']:checked").length != 1) {
      alert('You have to choose from [Source],[Target] or [Other] before commit');
      return false;
    }
    //now if the one of the radio button options has been chosen
    var word = $('#sourceWord').val();
    if(word==null||word=="")
    {
       alert("You need to fill in 'Actor Text' first.");
    }
    $('#nouncommit').prop('disabled',true);

    var sentenceId = $scope.currentSentenceId;
    var countryCode = $('#combobox0input').val();
    countryCode=(countryCode==="000")?"":countryCode;
    var firstRoleCode = $('#combobox1input').val();
    firstRoleCode=(firstRoleCode==="000")?"":firstRoleCode;
    var secondRoleCode = $('#combobox2input').val();
    secondRoleCode=(secondRoleCode==="000")?"":secondRoleCode;
    var dateStart =$('#startdate').val(); //$scope.sourceForm.startdate;
    var dateEnd = $('#enddate').val();//$scope.sourceForm.enddate;


    if (dateStart.toLowerCase()==="now") {
      dateStart = "2200-01-01";
    }
    else if(dateStart === ""||dateStart.toLowerCase()==="na")
    {
      dateStart = "1800-01-01";
    }

    if (dateEnd.toLowerCase()==="now") {
      dateEnd = "2200-01-01";
    }
     else if(dateEnd === ""||dateEnd.toLowerCase()==="na")
    {
      dateEnd= "1800-01-01";
    }


    var sourceDicObject = {
      word: word,
      sentenceId: sentenceId,
      //this is they way to go there is bug in combobox auto complete use jquery directly
      countryCode: countryCode, //countryCode
      firstRoleCode: firstRoleCode, //firstRoleCode
      secondRoleCode: secondRoleCode, //secondRoleCode
      dateStart: dateStart,
      dateEnd: dateEnd,
      confidenceFlag: flagged,
      username:localStorage.getItem('currentuser'),
      userid:localStorage.getItem('currentid')
        //get the useId from the req in api.
    };
    //if it is source push into sourcelist 
    var chosenOption = $("input:radio[name='inlineRadioOptions']:checked").val();
    if (chosenOption != "Other") {

      if (chosenOption === "Source") {
        var hiddenNounObject = {
          sourceWord: word,
          sourceCountryCode: countryCode,
          sourceFirstRoleCode: firstRoleCode,
          sourceSecondRoleCode: secondRoleCode,
          sourceStartDate: dateStart,
          sourceEndDate: dateEnd
        }

        sourceList.push(hiddenNounObject);
      } else if (chosenOption === "Target") {
        var hiddenNounObject = {
          targetWord: word,
          targetCountryCode: countryCode,
          targetFirstRoleCode: firstRoleCode,
          targetSecondRoleCode: secondRoleCode,
          targetStartDate: dateStart,
          targetEndDate: dateEnd
        }
        targetList.push(hiddenNounObject);
      }
    }

    var responsePromise = $http.post("/api/addSourceDictionary", sourceDicObject);
    responsePromise.success(function(dataFromServer, status, headers, config) {
      console.log("Submitting source form is successful!");
    });
    responsePromise.error(function(data, status, headers, config) {
      alert("Submitting source form failed,please try again.");
    });
  }

  /**********end of source Form***************************************/

  /*****************verb form********************************************/
  $scope.verbForm = {};
  var verbList = [];
  $scope.verbForm.submitVerbForm = function(item, event) {
    var flagged = false;
    if ($('#verbflag').prop("checked")) {
      flagged = true;
    }
    var word = $('#verbword').val();
    if(word==null||word=="")
    {
       alert("You need to fill in the verb first.");
    }
    $('#verbcommit').prop("disabled",true);
    var verbcode = $('#combobox6input').val();
    verbcode=(verbcode==="000")?"":verbcode;

    var sentenceId = $scope.currentSentenceId;
    var verbDicObject = {
      word: word,
      sentenceId: sentenceId,
      verbcode: verbcode,
      confidenceFlag: flagged,
      username:localStorage.getItem('currentuser'),
      userid:localStorage.getItem('currentid')
    };

    var hiddenVerbObject = {
      verbWord: word, //verbWord has to be the same in the sentenceTaggingResult.js model
      verbCode: verbcode //verbCode has to be the same with in the sentenceTaggingResult.js model
    }
    verbList.push(hiddenVerbObject);
    var responsePromise = $http.post("/api/addVerbDictionary", verbDicObject);
    responsePromise.success(function(dataFromServer, status, headers, config) {
      console.log("Submitting verb form is successful!");
    });
    responsePromise.error(function(data, status, headers, config) {
      alert("Submitting verb form failed.please try again right here.");
    });
  }


  /************end of verb form*******************************************/


  /**********commit the whole sentence********************************/

  $scope.commitSentence = function() {
      var sentenceId = $scope.currentSentenceId;

      var wholeSentenceObject = {
          sentenceId: sentenceId,
          sourceList: sourceList,
          verbList: verbList,
          targetList: targetList,
          userid:localStorage.getItem('currentid')
        }
        //make the tag to be 1 after commit the whole sentence.
      $('#sentencecommit').prop("disabled",true);
      $http.post('/updateSentenceTag', {
        'sentenceId': sentenceId
      }).success(function(data) {
        console.log("sentence tag is updated!");
      });

      //create the new tagging result
      var responsePromise = $http.post("/addNewSentenceTaggingResult", wholeSentenceObject);
      responsePromise.success(function(dataFromServer, status, headers, config) {
        console.log("Submitting source form is successful!");
        //clear the list
        sourceList = [];
        targetList = [];
        verbList = [];
      });
      responsePromise.error(function(data, status, headers, config) {
        //alert("Submitting form failed!");
        console.log("Submitting source form failed!");
        alert("Commit sentence to server failed,please try again.");
        //clear the list
       /* sourceList = [];
        targetList = [];
        verbList = [];*/
      });
    }
    /**************end of commit the whole sentence**********************/



  /****************test section***************************/



  /***************end of test section**************************/



}]);