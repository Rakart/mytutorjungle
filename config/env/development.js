'use strict';

var FACEBOOK_ID = '1457528407878946',
	FACEBOOK_SECRET = 'cba924e316a7bd1501273c909440202e',
	GOOGLE_ID = '627461077575-2lnaefme4fg2sd15e8i3un0clliacqpj.apps.googleusercontent.com',
	GOOGLE_SECRET = 'adLU_Y38QEtjph6kPRQa4Yky',
	TWITTER_KEY = 'Mz4p4KIuWviA6mmfLMIgksRgG',
	TWITTER_SECRET = 'yOSk8AuiGu1Da9yD6jAkFzPDfUEL1uIA9PPlVJy4AGH7yDBjuL';



module.exports = {
	db: 'mongodb://localhost/my-tutor-jungle-dev',
	app: {
		title: 'My Tutor Jungle - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || FACEBOOK_ID,
		clientSecret: process.env.FACEBOOK_SECRET || FACEBOOK_SECRET,
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || TWITTER_KEY,
		clientSecret: process.env.TWITTER_SECRET || TWITTER_SECRET,
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET || GOOGLE_SECRET,
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
