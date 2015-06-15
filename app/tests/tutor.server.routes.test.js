'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tutor = mongoose.model('Tutor'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, tutor;

/**
 * Tutor routes tests
 */
describe('Tutor CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Tutor
		user.save(function() {
			tutor = {
				name: 'Tutor Name'
			};

			done();
		});
	});

	it('should be able to save Tutor instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tutor
				agent.post('/tutors')
					.send(tutor)
					.expect(200)
					.end(function(tutorSaveErr, tutorSaveRes) {
						// Handle Tutor save error
						if (tutorSaveErr) done(tutorSaveErr);

						// Get a list of Tutors
						agent.get('/tutors')
							.end(function(tutorsGetErr, tutorsGetRes) {
								// Handle Tutor save error
								if (tutorsGetErr) done(tutorsGetErr);

								// Get Tutors list
								var tutors = tutorsGetRes.body;

								// Set assertions
								(tutors[0].user._id).should.equal(userId);
								(tutors[0].name).should.match('Tutor Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Tutor instance if not logged in', function(done) {
		agent.post('/tutors')
			.send(tutor)
			.expect(401)
			.end(function(tutorSaveErr, tutorSaveRes) {
				// Call the assertion callback
				done(tutorSaveErr);
			});
	});

	it('should not be able to save Tutor instance if no name is provided', function(done) {
		// Invalidate name field
		tutor.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tutor
				agent.post('/tutors')
					.send(tutor)
					.expect(400)
					.end(function(tutorSaveErr, tutorSaveRes) {
						// Set message assertion
						(tutorSaveRes.body.message).should.match('Please fill Tutor name');
						
						// Handle Tutor save error
						done(tutorSaveErr);
					});
			});
	});

	it('should be able to update Tutor instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tutor
				agent.post('/tutors')
					.send(tutor)
					.expect(200)
					.end(function(tutorSaveErr, tutorSaveRes) {
						// Handle Tutor save error
						if (tutorSaveErr) done(tutorSaveErr);

						// Update Tutor name
						tutor.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Tutor
						agent.put('/tutors/' + tutorSaveRes.body._id)
							.send(tutor)
							.expect(200)
							.end(function(tutorUpdateErr, tutorUpdateRes) {
								// Handle Tutor update error
								if (tutorUpdateErr) done(tutorUpdateErr);

								// Set assertions
								(tutorUpdateRes.body._id).should.equal(tutorSaveRes.body._id);
								(tutorUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tutors if not signed in', function(done) {
		// Create new Tutor model instance
		var tutorObj = new Tutor(tutor);

		// Save the Tutor
		tutorObj.save(function() {
			// Request Tutors
			request(app).get('/tutors')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Tutor if not signed in', function(done) {
		// Create new Tutor model instance
		var tutorObj = new Tutor(tutor);

		// Save the Tutor
		tutorObj.save(function() {
			request(app).get('/tutors/' + tutorObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', tutor.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Tutor instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tutor
				agent.post('/tutors')
					.send(tutor)
					.expect(200)
					.end(function(tutorSaveErr, tutorSaveRes) {
						// Handle Tutor save error
						if (tutorSaveErr) done(tutorSaveErr);

						// Delete existing Tutor
						agent.delete('/tutors/' + tutorSaveRes.body._id)
							.send(tutor)
							.expect(200)
							.end(function(tutorDeleteErr, tutorDeleteRes) {
								// Handle Tutor error error
								if (tutorDeleteErr) done(tutorDeleteErr);

								// Set assertions
								(tutorDeleteRes.body._id).should.equal(tutorSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Tutor instance if not signed in', function(done) {
		// Set Tutor user 
		tutor.user = user;

		// Create new Tutor model instance
		var tutorObj = new Tutor(tutor);

		// Save the Tutor
		tutorObj.save(function() {
			// Try deleting Tutor
			request(app).delete('/tutors/' + tutorObj._id)
			.expect(401)
			.end(function(tutorDeleteErr, tutorDeleteRes) {
				// Set message assertion
				(tutorDeleteRes.body.message).should.match('User is not logged in');

				// Handle Tutor error error
				done(tutorDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Tutor.remove().exec();
		done();
	});
});