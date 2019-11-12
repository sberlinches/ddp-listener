'use strict';

const DDP = require('ddp');
const login = require('ddp-login');
const config = require('./config').config;
const subscriptions = require('./subscriptions');
const ddpClient = new DDP({
	host: config.host,
	port: config.port,
	maintainCollections: true
});

const userId = 'iJjpDyoihRyj8k3Ac';
const userAuthToken = 'F718jfLczL4xY7Do2CNHCSUOXj0QYqjXoGSPdvdnw6x';
const username = 'Sergio Berlinches';
const roomId = 'rnpxohtHRpTtpqybi';

process.env.AUTH_TOKEN = userAuthToken;

ddpClient.connect((err) => {
	if (err) console.error(err);

	login(ddpClient, {
		env: 'AUTH_TOKEN',
		method: 'token',
		retry: 5
	}, (err) => {
		if (err) console.error(err);
		//subscriptions.subscribeStreamNotifyUser(ddpClient, 'message', userId);
		//subscriptions.callStreamNotifyRoom(ddpClient, username, roomId, true);
		//subscriptions.subscribeStreamNotifyRoom(ddpClient, 'typing', roomId);
		subscriptions.subscribeStreamNotifyMessages(ddpClient, roomId);
	});
});
