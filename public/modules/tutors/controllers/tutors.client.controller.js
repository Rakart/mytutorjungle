'use strict';

var tutorsApp = angular.module('tutors');

// Tutors controller
tutorsApp.controller('TutorsController', ['$scope', '$stateParams', 'Authentication', 'Tutors', '$modal', '$log',
	function($scope, $stateParams, Authentication, Tutors, $modal, $log) {
		this.authentication = Authentication;

		// Find a list of Tutors
		this.tutors = Tutors.query();

		// Open a modal window to update a single registered tutor
		this.modalUpdate = function (size, selectedTutor) {

		    var modalInstance = $modal.open({
		      templateUrl: 'modules/tutors/views/edit-tutor.client.view.html',
		      controller: function($scope, $modalInstance, tutor) {
		      	$scope.tutor = tutor;
		      },
		      size: size,
		      resolve: {
		        tutor: function () {
		          return selectedTutor;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      	$scope.selected = selectedItem;
		    }, function () {
	      		$log.info('Modal dismissed at: ' + new Date());
		    });
	  	};
	}
]);

// Tutors create controller
tutorsApp.controller('TutorsCreateController', ['$scope', 'Tutors',
	function($scope, Tutors) {
	}
]);

// Tutors edit controller
tutorsApp.controller('TutorsUpdateController', ['$scope', 'Tutors',
	function($scope, Tutors) {
	}
]);

		
/*
		// Create new Tutor
		$scope.create = function() {
			// Create new Tutor object
			var tutor = new Tutors ({
				firstName: this.firstName,
				lastName: this.lastName,
				suburb: this.suburb,
				country: this.country,
				email: this.email,
				phone: this.phone,
				moeCert: this.moeCert
			});

			// Redirect after save
			tutor.$save(function(response) {
				$location.path('tutors/' + response._id);

				// Clear form fields
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.suburb = '';
				$scope.country = '';
				$scope.email = '';
				$scope.phone = '';
				$scope.moeCert = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tutor
		$scope.remove = function(tutor) {
			if ( tutor ) { 
				tutor.$remove();

				for (var i in $scope.tutors) {
					if ($scope.tutors [i] === tutor) {
						$scope.tutors.splice(i, 1);
					}
				}
			} else {
				$scope.tutor.$remove(function() {
					$location.path('tutors');
				});
			}
		};

		// Update existing Tutor
		$scope.update = function() {
			var tutor = $scope.tutor;

			tutor.$update(function() {
				$location.path('tutors/' + tutor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		// Find existing Tutor
		$scope.findOne = function() {
			$scope.tutor = Tutors.get({ 
				tutorId: $stateParams.tutorId
			});
		};

		*/
