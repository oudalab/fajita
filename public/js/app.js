var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('AutoCompleteRetriever',function($http, $q, $timeout){
  var AutoCompleteRetriever = new Object();

  AutoCompleteRetriever.getAgents=function() {
        return $http.get('/api/agents');
      }
  AutoCompleteRetriever.getActors=function() {
        return $http.get('/api/actors');
      }

   AutoCompleteRetriever.getVerbs=function() {
        return $http.get('/api/verbs');
      }

  AutoCompleteRetriever.getCountryDropdown = function(i) {
    var deferredCountryData = $q.defer();
    var country;
    var moreCountry=[];
    this.getActors()
       .success(function(data){
             data.forEach(function(item){
              moreCountry.push(item['name']);
             });
       });
    country=moreCounrty;
    $timeout(function(){
      deferredCountryData.resolve(country);
    },1000);

    return deferredCountryData.promise;
  }

  AutoCompleteRetriever.getAgentDropdown = function(i) {
    var deferredAgentData = $q.defer();
    var agent;
    var moreAgent=[];
    this.getAgents()
       .success(function(data){
             data.forEach(function(item){
              moreAgent.push(item['name']);
             });
       });
      agent=moreAgent;

    $timeout(function(){
      deferredAgentData.resolve(agent);
    },1000);

    return deferredAgentData.promise;
  }

  AutoCompleteRetriever.getVerbDropdown= function(i) {
    var deferredVerbData= $q.defer();
     var verb;
     var moreVerb=[];
     this.getVerbs()
         .success(function(data){
               data.forEach(function(item){
                moreVerb.push(item['name']);
               });
         });

      verb=moreVerb;

    $timeout(function(){
      deferredVerbData.resolve(verb);
    },1000);

    return deferredVerbData.promise;
  }
  //factory return this retriever object.
  return AutoCompleteRetriever;
});


app.controller('MyCtrl', function($scope, AutoCompleteRetriever){

  $scope.countryDropdown = AutoCompleteRetriever.getCountryDropdown("...");
  $scope.countryDropdown.then(function(data){
  $scope.countryDropdown = data;
  });

  $scope.agentDropdown= AutoCompleteRetriever.getmovies1("...");
  $scope.agentDropdown.then(function(data){
  $scope.agentDropdown = data;
  });

  $scope.verbDropdown = AutoCompleteRetriever.getmovies2("...");
  $scope.verbDropdown.then(function(data){
  $scope.verbDropdown= data;
  });

  $scope.getCountryDropdown = function(){
    return $scope.countryDropdown;  
  }
  $scope.getAgentDropdown = function(){
    return $scope.agentDropdown;
  }
});
