angular.module('mainServiceModule').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      getUserStatus: getUserStatus,
      isLoggedIn: isLoggedIn,
      
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      //getUserStatus();
      if(user) {
        console.log("user logged in ");
        return true;
      } else {
        console.log("user not logged in ");
        return false;
      }
    }

    function getUserStatus() {
      //console.log("user status has been checked");
      var deferred = $q.defer();
      $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
          deferred.resolve();
          console.log("user authenticated!");
         
        } else {
          user = false;
           deferred.reject();
          console.log("user not get authenticated!");

        }
      })
      // handle error
      .error(function (data) {
        deferred.reject();
        user = false;
      });
      return deferred.promise;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);