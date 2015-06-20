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
	age: {
		type: Number,
		default: '',
		required: 'Please enter your Age',
		trim: true
	},
	nric: {
		type: String,
		default: '',
		required: 'Please enter your NRIC',
		trim: true
	},
	blockNo: {
		type: String,
		default: '',
		required: 'Please enter your block number',
		trim: true
	},
	roadName: {
		type: String,
		default: '',
		required: 'Please fill in Suburb',
		trim: true
	},
	unitNo: {
		type: String,
		default: '',
		required: 'Please enter your floor number & unit/house number',
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
	highestQual: {
		type: String,
		default: '',
		required: 'Please select your highest education level',
		trim: true
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
