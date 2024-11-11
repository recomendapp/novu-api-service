import { workflow } from "@novu/framework";
import { z } from 'zod';

export const guidelistSendWorkflow = workflow('guidelist_send', async ({ payload, step }) => {
	const inAppResponse = await step.inApp('notify', () => ({
		body: `@${payload.sender} recomended you ${payload.movie}`
	}));
}, {
	payloadSchema: z.object({
		sender: z.string().describe('The user who sent the guidelist'),
		movie: z.string().describe('The movie that was recommended')
	})
});

export const guidelistCompletedWorkflow = workflow('guidelist_completed', async ({ payload, step }) => {
	const inAppResponse = await step.inApp('notify', () => ({
		body: `@${payload.receiver} has watched ${payload.movie} you recommended`
	}));
}, {
	payloadSchema: z.object({
		receiver: z.string().describe('The user who received the guidelist'),
		movie: z.string().describe('The movie that was watched')
	})
});
