'use strict';

//Setting up route
angular.module('tutors').config(['$stateProvider',
	function($stateProvider) {
		// Tutors state routing
		$stateProvider.
		state('listTutors', {
			url: '/tutors',
			templateUrl: 'modules/tutors/views/list-tutors.client.view.html'
		}).
		state('createTutor', {
			url: '/tutors/create',
			templateUrl: 'modules/tutors/views/create-tutor.client.view.html'
		}).
		state('viewTutor', {
			url: '/tutors/:tutorId',
			templateUrl: 'modules/tutors/views/view-tutor.client.view.html'
		}).
		state('editTutor', {
			url: '/tutors/:tutorId/edit',
			templateUrl: 'modules/tutors/views/edit-tutor.client.view.html'
		});
	}
]);