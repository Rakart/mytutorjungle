'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tutor Schema
 */
var TutorSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill in first name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill in last name',
		trim: true
	},
	suburb: {
		type: String,
		default: '',
		required: 'Please fill in Suburb',
		trim: true
	},
	country: {
		type: String,
		default: '',
		required: 'Please fill in Country',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill in email address',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		required: 'Please fill in phone number',
		trim: true
	},
	moeCert: {
		type: Boolean,
		default: false
	},			
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Tutor', TutorSchema);