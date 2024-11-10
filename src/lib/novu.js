import { Novu } from "@novu/node";

const novu = new Novu({
	apiKey: process.env.NOVU_API_KEY,
	backendUrl: process.env.NOVU_BACKEND_URL || "https://eu.api.novu.co",
});

export default novu;