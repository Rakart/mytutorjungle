'use strict';

//Setting up route
angular.module('tutors').config(['$stateProvider',
	function($stateProvider) {
		// Tutors state routing
		$stateProvider.
		state('listTutors', {
			url: '/tutors',
			templateUrl: 'modules/tutors/views/tinder-view.client.html'
		});
	}
]);
