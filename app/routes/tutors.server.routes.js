'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var tutors = require('../../app/controllers/tutors.server.controller');

	// Tutors Routes
	app.route('/tutors')
		.get(tutors.list)
		.post(users.requiresLogin, tutors.create);

	app.route('/tutors/:tutorId')
		.get(tutors.read)
		.put(users.requiresLogin, tutors.hasAuthorization, tutors.update)
		.delete(users.requiresLogin, tutors.hasAuthorization, tutors.delete);

	// Finish by binding the Tutor middleware
	app.param('tutorId', tutors.tutorByID);
};
