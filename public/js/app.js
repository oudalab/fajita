var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('MovieRetriever',function($http, $q, $timeout){
  var MovieRetriever = new Object();

  MovieRetriever.getAgents=function() {
        return $http.get('/api/agents');
      }
  MovieRetriever.getActors=function() {
        return $http.get('/api/actors');
      }

   MovieRetriever.getVerbs=function() {
        return $http.get('/api/verbs');
      }

  MovieRetriever.getmovies = function(i) {
    var moviedata = $q.defer();
    var movies;
   var moreMovies=[];
   this.getActors()
       .success(function(data){
             data.forEach(function(item){
              moreMovies.push(item['name']);
             });
       });

    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

    MovieRetriever.getmovies1 = function(i) {
    var moviedata = $q.defer();
    var movies;
   var moreMovies=[];
   this.getAgents()
       .success(function(data){
             data.forEach(function(item){
              moreMovies.push(item['name']);
             });
       });

    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

      MovieRetriever.getmovies2= function(i) {
    var moviedata = $q.defer();
    var movies;
   var moreMovies=[];
   this.getVerbs()
       .success(function(data){
             data.forEach(function(item){
              moreMovies.push(item['name']);
             });
       });

    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

  return MovieRetriever;
});

app.controller('MyCtrl', function($scope, MovieRetriever){

  $scope.movies = MovieRetriever.getmovies("...");
  $scope.movies.then(function(data){
    $scope.movies = data;
  });

    $scope.movies1 = MovieRetriever.getmovies1("...");
  $scope.movies1.then(function(data){
    $scope.movies1 = data;
  });

     $scope.movies2 = MovieRetriever.getmovies2("...");
  $scope.movies2.then(function(data){
    $scope.movies2= data;
  });

  $scope.getmovies = function(){
    return $scope.movies;  //for source country
  }

   $scope.getmovies1 = function(){
    return $scope.movies1; //for source agent
  }

/*  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    $scope.newmovies = MovieRetriever.getmovies(typedthings);
    $scope.newmovies.then(function(data){
      $scope.movies = data;
    });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: " + suggestion );
  }*/

});
