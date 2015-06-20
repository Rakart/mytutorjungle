'use strict';

var tutorsApp = angular.module('tutors');

// Tutors controller
tutorsApp.controller('TutorsController', ['$scope', '$stateParams', 'Authentication', 'Tutors', '$modal', '$log',
	function($scope, $stateParams, Authentication, Tutors, $modal, $log) {

		// Check for logged-in
		this.authentication = Authentication;

		// Get the list of Tutors from mongodb
		this.tutors = Tutors.query();

		// Navigates through the tutors available.
		$scope.selected = 0;
		this.nextTutor = function(selected) {

			if (selected === this.tutors.length - 1 ) {
				$scope.selected = 0;
			} else {
				$scope.selected = selected + 1;
			}
		};

		// Open a modal window to create a single registered tutor
		this.modalCreate = function (size) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/tutors/views/create-tutor.client.view.html',
				controller: function($scope, $modalInstance) {

					$scope.ok = function (isValid) {
						if (isValid){
							$modalInstance.close();
						}
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size,
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		// Open a modal window to update a single registered tutor
		this.modalUpdate = function (size, selectedTutor) {
		    var modalInstance = $modal.open({
		      templateUrl: 'modules/tutors/views/edit-tutor.client.view.html',
		      controller: function($scope, $modalInstance, tutor) {
		      	$scope.tutor = tutor;

		      	$scope.ok = function (isValid) {
					if (isValid){
						$modalInstance.close($scope.tutor);
					}
				};

				$scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				};
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

		// Remove existing Tutor
		this.remove = function(tutor) {
			if ( tutor ) {
				tutor.$remove();

				for (var i in this.tutors) {
					if (this.tutors [i] === tutor) {
						this.tutors.splice(i, 1);
					}
				}
			} else {
				this.tutor.$remove(function() {
				});
			}
		};
	}
]);

// Tutors create controller
tutorsApp.controller('TutorsCreateController', ['$scope', 'Tutors', 'Notify',
	function($scope, Tutors, Notify) {
		// Create new Tutor
		this.create = function() {
			// Create new Tutor object
			var tutor = new Tutors ({
				firstName: this.firstName,
				lastName: this.lastName,
				age: this.age,
				nric: this.nric,
				blockNo: this.blockNo,
				roadName: this.roadName,
				unitNo: this.unitNo,
				email: this.email,
				phone: this.phone,
				highestQual: this.highestQual
			});

			// Redirect after save
			tutor.$save(function(response) {

				Notify.sendMsg('NewTutor', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

// Tutors edit controller
tutorsApp.controller('TutorsUpdateController', ['$scope', 'Tutors',
	function($scope, Tutors) {

		// Update existing Tutor
		this.update = function(updatedTutor) {
			var tutor = updatedTutor;

			tutor.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

tutorsApp.directive('tutorList', [ 'Tutors', 'Notify', function(Tutors, Notify) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/tutors/views/tutor-view-template.html',
		link: function(scope, elem, attr) {

			//when a new tutor is added, update the tutor list
			Notify.getMsg('NewTutor', function(event, data) {

				scope.tutorsCtrl.tutors = Tutors.query();
			});
		}
	};
}]);


// Tinder application view of the app.
tutorsApp.directive('tutorTinder', ['Tutors', function(Tutors) {
	return {
		restrict: 'E',
		templateUrl: 'modules/tutors/views/tutor-tinder-view.template.html',
		transclude: true
	};
}]);

