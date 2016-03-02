angular.module('verbService',[])
  	.factory('Verbs', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/verbs');
			}
		/*	create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}*/
		}
	}]);