import { Novu } from "@novu/node";

const novu = new Novu(process.env.NOVU_SECRET_KEY);

export default novu;