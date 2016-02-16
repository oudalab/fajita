angular.module('agentService',[])
	.factory('Agents', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/agents');
			}
		/*	create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}*/
		}
	}]);
