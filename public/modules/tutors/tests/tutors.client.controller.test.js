'use strict';

(function() {
	// Tutors Controller Spec
	describe('Tutors Controller Tests', function() {
		// Initialize global variables
		var TutorsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Tutors controller.
			TutorsController = $controller('TutorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Tutor object fetched from XHR', inject(function(Tutors) {
			// Create sample Tutor using the Tutors service
			var sampleTutor = new Tutors({
				name: 'New Tutor'
			});

			// Create a sample Tutors array that includes the new Tutor
			var sampleTutors = [sampleTutor];

			// Set GET response
			$httpBackend.expectGET('tutors').respond(sampleTutors);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tutors).toEqualData(sampleTutors);
		}));

		it('$scope.findOne() should create an array with one Tutor object fetched from XHR using a tutorId URL parameter', inject(function(Tutors) {
			// Define a sample Tutor object
			var sampleTutor = new Tutors({
				name: 'New Tutor'
			});

			// Set the URL parameter
			$stateParams.tutorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/tutors\/([0-9a-fA-F]{24})$/).respond(sampleTutor);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tutor).toEqualData(sampleTutor);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Tutors) {
			// Create a sample Tutor object
			var sampleTutorPostData = new Tutors({
				name: 'New Tutor'
			});

			// Create a sample Tutor response
			var sampleTutorResponse = new Tutors({
				_id: '525cf20451979dea2c000001',
				name: 'New Tutor'
			});

			// Fixture mock form input values
			scope.name = 'New Tutor';

			// Set POST response
			$httpBackend.expectPOST('tutors', sampleTutorPostData).respond(sampleTutorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Tutor was created
			expect($location.path()).toBe('/tutors/' + sampleTutorResponse._id);
		}));

		it('$scope.update() should update a valid Tutor', inject(function(Tutors) {
			// Define a sample Tutor put data
			var sampleTutorPutData = new Tutors({
				_id: '525cf20451979dea2c000001',
				name: 'New Tutor'
			});

			// Mock Tutor in scope
			scope.tutor = sampleTutorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/tutors\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tutors/' + sampleTutorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid tutorId and remove the Tutor from the scope', inject(function(Tutors) {
			// Create new Tutor object
			var sampleTutor = new Tutors({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tutors array and include the Tutor
			scope.tutors = [sampleTutor];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/tutors\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTutor);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.tutors.length).toBe(0);
		}));
	});
}());