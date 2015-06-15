'use strict';

//Tutors service used to communicate Tutors REST endpoints
angular.module('tutors').factory('Tutors', ['$resource',
	function($resource) {
		return $resource('tutors/:tutorId', { tutorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);