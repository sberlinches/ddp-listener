/**
 * @param {Object} ddpClient
 * @param {('message'|'otr'|'webrtc'|'notification'|'rooms-changed','subscriptions-changed')} event
 * @param {string} userId
 */
exports.subscribeStreamNotifyUser = (ddpClient, event, userId) => {

	ddpClient.subscribe(
		'stream-notify-user',
		[
			`${userId}/${event}`,
			false
		],
		() => {
			ddpClient.on('message', (msg) => {
				console.log('/%s %s', event, msg);
			});
		}
	);
};

/**
 * @param {Object} ddpClient
 * @param {('deleteMessage'|'typing')} event
 * @param {string} roomId
 */
exports.subscribeStreamNotifyRoom = (ddpClient, event, roomId) => {

	ddpClient.subscribe(
		'stream-notify-room',
		[
			`${roomId}/${event}`,
			false
		],
		() => {
			ddpClient.on('message', (msg) => {
				console.log('/%s %s', event, msg);
			});
		}
	);
};

/**
 * @param {Object} ddpClient
 * @param {string} roomId
 */
exports.subscribeStreamNotifyMessages = (ddpClient, roomId = '__my_messages__') => {

	ddpClient.subscribe(
		'stream-room-messages',
		[
			roomId,
			false
		],
		() => {
			ddpClient.on('message', (msg) => {
				console.log('/%s %s', 'message', msg);
			});
		}
	);
};

/**
 * @param {Object} ddpClient
 * @param {string} username
 * @param {string} roomId
 * @param {boolean} typing
 */
exports.callStreamNotifyRoom = (ddpClient, username, roomId, typing) => {

	ddpClient.call(
		'stream-notify-room',
		[
			`${roomId}/typing`,
			username,
			typing
		]
	);
};
