'use strict';

// Tutors controller
angular.module('tutors').controller('TutorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tutors',
	function($scope, $stateParams, $location, Authentication, Tutors) {
		$scope.authentication = Authentication;

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

		// Find a list of Tutors
		$scope.find = function() {
			$scope.tutors = Tutors.query();
		};

		// Find existing Tutor
		$scope.findOne = function() {
			$scope.tutor = Tutors.get({ 
				tutorId: $stateParams.tutorId
			});
		};
	}
]);