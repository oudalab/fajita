var app=angular.module('mainServiceModule', ['720kb.datepicker','app']);

    app.factory('Actors', ['$http',function($http) {
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
	app.factory('Agents', ['$http',function($http) {
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
	app.factory('Verbs', ['$http',function($http) {
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
	// inject the Todo service factory into our controller
	app.controller('mainController', ['$scope','$http','Actors','Agents','Verbs','AutoCompleteRetriever', function($scope,$http,Actors,Agents,Verbs,AutoCompleteRetriever) {
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
		  //
      //end of datepicker ,,'material.svgAssetsCache'

		$scope.formData = {};
		$scope.loading = true;

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
		Verbs.get()
		    .success(function(data){
              $scope.loading=false;
              $scope.verbdata={
              	availableOptions:data,
              	selectedOption:data[0].name
              }
		    });

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
/*		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};*/

		// DELETE ==================================================================
		// delete a todo after checking it
	/*	$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};*/

		/*$scope.movies = ["Lord of the Rings",
                        "Drive",
                        "Science of Sleep",
                        "Back to the Future",
                        "Oldboy"];*/

        // gives another movie array on change
        $scope.updateCountryDropdown = function(typed){ //FOR COUNTRY
            // AutoCompleteRetriever could be some service returning a promise
            $scope.newCountry = AutoCompleteRetriever.getCountryDropdown(typed);
            $scope.newCounrty.then(function(data){
              $scope.countryDropdown= data;
            });
        }
          $scope.updateAgentDropdown = function(typed){//FOR AGENT
            // AutoCompleteRetriever could be some service returning a promise
            $scope.newAgent = AutoCompleteRetriever.getAgentDropdown(typed);
            $scope.newAgent.then(function(data){
              $scope.agentDropdown = data;
            });
        }
           $scope.updateVerbDropdown= function(typed){//FOR VERB
            // AutoCompleteRetriever could be some service returning a promise
            $scope.newVerb= AutoCompleteRetriever.getVerbDropdown(typed);
            $scope.newVerb.then(function(data){
              $scope.VerbDropdown = data;
            });
        }

            //var CanadaProvinces = {52:"Ontario", 53:"Quebec", 54:"British Columbia", 55:"Alberta", 56:"Manitoba", 57:"Saskatchewan", 58:"Nova Scotia", 59:"New Brunswick", 60:"Newfoundland and Labrador",61:"Prince Edward Island", 62:"Northwest Territories", 63:"Yukon", 64:"Nunavut"};
 
 /*     	  CanadaProvinces = {52:"Ontario", 53:"Quebec", 54:"British Columbia", 55:"Alberta", 56:"Manitoba", 57:"Saskatchewan", 58:"Nova Scotia", 59:"New Brunswick", 60:"Newfoundland and Labrador",61:"Prince Edward Island", 62:"Northwest Territories", 63:"Yukon", 64:"Nunavut"};
            for(var key in CanadaProvinces) 
            {
                var opt = document.createElement('option');
                opt.value = key;
                opt.innerHTML = CanadaProvinces[key];
                $(elem).append(opt);
                console.log("should show this!");
                 $('#combobox')
                 .append($("<option></option>")
                 .attr("value",key)
                 .text(CanadaProvinces[key]));
                 // combobox
            }*/
     
	}]);

