'use strict';

// Configuring the Articles module
angular.module('tutors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tutors', 'tutors', 'dropdown', '/tutors(/create)?');
		Menus.addSubMenuItem('topbar', 'tutors', 'List Tutors', 'tutors');
		Menus.addSubMenuItem('topbar', 'tutors', 'New Tutor', 'tutors/create');
	}
]);