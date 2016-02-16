angular.module('actorService',[])
  	.factory('Actors', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/actors');
			}
		/*	create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}*/
		}
	}]);