// import { guidelistCompletedWorkflow, guidelistSendWorkflow } from './guidelist.workflow.js';
import { novu } from '../../lib/novu.js';
import { supabase } from '../../lib/supabase.js';

export const sendGuidelist = async (payload) => {
	const { data, error: errSender } = await supabase
		.from('user_movie_guidelist')
		.select('receiver:user_id(*),sender:sender_id(*)')
		.eq('id', payload.record.id)
		.single();

	if (errSender) {
		throw new Error(errSender.message);
	}

	console.log(`Sender: ${JSON.stringify(data)}`);

	const { data: movie, error: errMovie } = await supabase
	.from('movie')
	.select('title')
	.eq('id', payload.record.movie_id)
	.setHeader('language', data.receiver.language)
	.single();

	if (errMovie) {
		throw new Error(errMovie.message);
	}

	console.log(`Movie: ${JSON.stringify(movie)}`);

	await novu.trigger('guidelist_send', {
		to: payload.record.user_id,
		payload: {
			message: `@${data.sender.username} recomended you ${movie.title}`
		},
		actor: {
			subscriberId: data.sender.id,
			avatar: data.sender.avatar_url,
		}
	})

	// await guidelistSendWorkflow.trigger({
	// 	to: record.user_id,
	// 	payload: {
	// 		sender: data.sender.username,
	// 		movie: movie.title
	// 	}
	// })
};

export const completeGuidelist = async ({ record, old_record}) => {
	// // Check if the guidelist status has changed to completed
	// if (record.status !== 'completed' || old_record.status === 'completed') {
	// 	return;
	// }

	// const { data, error: errReceiver } = await supabase
	// .from('user_movie_guidelist')
	// .select('receiver:user_id(username),sender:sender_id(language)')
	// .eq('id', record.id)
	// .single();

	// if (errReceiver) {
	// 	throw new Error(errReceiver.message);
	// }

	// const { data: movie, error: errMovie } = await supabase
	// .from('movie')
	// .select('title')
	// .eq('id', record.movie_id)
	// .setHeader('language', data.sender.language)
	// .single();

	// if (errMovie) {
	// 	throw new Error(errMovie.message);
	// }

	// await guidelistCompletedWorkflow.trigger({
	// 	to: record.user_id,
	// 	payload: {
	// 		receiver: data.receiver.username,
	// 		movie: movie.title
	// 	}
	// })
};

