'use strict';

//Setting up route
angular.module('tutors').config(['$stateProvider',
	function($stateProvider) {
		// Tutors state routing
		$stateProvider.
		state('listTutors', {
			url: '/tutors',
			templateUrl: 'modules/tutors/views/list-tutors.client.view.html'
		});
	}
]);
