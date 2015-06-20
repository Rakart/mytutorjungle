'use strict';

//Tutors service used to communicate Tutors REST endpoints

angular.module('tutors')

	//
	.factory('Tutors', ['$resource',
		function($resource) {
			return $resource('tutors/:tutorId', { tutorId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])

	// Updates the view after adding a new entry to mongodb
	.factory('Notify', ['$rootScope', function($rootScope) {

		var notify = {};

		notify.sendMsg = function(msg, data) {
			data = data || {};
			$rootScope.$emit(msg, data);

			console.log('message sent!');
		};

		notify.getMsg = function (msg, func, scope) {
			var unbind = $rootScope.$on(msg, func);

			if (scope) {
				scope.$on('destroy', unbind);
			}
		};

		return notify;
	}

	]);


