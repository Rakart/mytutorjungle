'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Tutor = mongoose.model('Tutor'),
	_ = require('lodash');

/**
 * Create a Tutor
 */
exports.create = function(req, res) {
	var tutor = new Tutor(req.body);
	tutor.user = req.user;

	tutor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tutor);
		}
	});
};

/**
 * Show the current Tutor
 */
exports.read = function(req, res) {
	res.jsonp(req.tutor);
};

/**
 * Update a Tutor
 */
exports.update = function(req, res) {
	var tutor = req.tutor ;

	tutor = _.extend(tutor , req.body);

	tutor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tutor);
		}
	});
};

/**
 * Delete an Tutor
 */
exports.delete = function(req, res) {
	var tutor = req.tutor ;

	tutor.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tutor);
		}
	});
};

/**
 * List of Tutors
 */
exports.list = function(req, res) { 
	Tutor.find().sort('-created').populate('user', 'displayName').exec(function(err, tutors) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tutors);
		}
	});
};

/**
 * Tutor middleware
 */
exports.tutorByID = function(req, res, next, id) { 
	Tutor.findById(id).populate('user', 'displayName').exec(function(err, tutor) {
		if (err) return next(err);
		if (! tutor) return next(new Error('Failed to load Tutor ' + id));
		req.tutor = tutor ;
		next();
	});
};

/**
 * Tutor authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tutor.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
