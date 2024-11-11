import { novu } from '../../lib/novu.js';

export const createSubscriber = async (payload) => {
	const { schema, table, record } = payload;

	const schemaTable = `${schema}.${table}`;
	const subscriberId = record.id;

	if (schemaTable === 'auth.users') {
		await novu.subscribers.identify(subscriberId, {
			email: record.email,
			phone: record.phone
		});
	} else if (schemaTable === 'public.user') {
		// Subscriber should already be identified (auth.users)
		await novu.subscribers.update(subscriberId, {
			avatar: record.avatar_url,
			data: {
				username: record.username,
				full_name: record.full_name,
			},
			locale: record.language,
		});
	} else {
		throw new Error('Invalid table');
	}
};

export const updateSubscriber = async (payload) => {
	const { schema, table, record } = payload;

	const schemaTable = `${schema}.${table}`;
	const subscriberId = record.id;

	if (schemaTable === 'auth.users') {
		await novu.subscribers.update(subscriberId, {
			email: record.email,
			phone: record.phone
		});
	} else if (schemaTable === 'public.user') {
		await novu.subscribers.update(subscriberId, {
			avatar: record.avatar_url,
			data: {
				username: record.username,
				full_name: record.full_name,
			},
			locale: record.language,
		});
	} else {
		throw new Error('Invalid table');
	}
};

export const deleteSubscriber = async (payload) => {
	const { schema, table, record } = payload;

	const schemaTable = `${schema}.${table}`;
	const subscriberId = record.id;

	if (schemaTable === 'auth.users') {
		await novu.subscribers.delete(subscriberId);
	} else if (schemaTable === 'public.user') {
		// Subscriber should already be deleted (auth.users)
	} else {
		throw new Error('Invalid table');
	}
};