import AppExpress from "@itznotabug/appexpress";
// Middlewares
import authMiddleware from './middlewares/auth.middleware.js';
// Routes
import subscriber from './routes/subscriber/subscriber.controller.js';
import guidelist from './routes/guidelist/guidelist.controller.js';
import { serve } from "@novu/framework/express";
import { guidelistCompletedWorkflow, guidelistSendWorkflow } from "./routes/guidelist/guidelist.workflow.js";

const app = new AppExpress();

// Middleware
app.middleware(authMiddleware);
// Novu
app.use(`/api/novu`, serve({ workflows: [guidelistSendWorkflow, guidelistCompletedWorkflow] }));
// Routes
app.use('/subscriber', subscriber);
app.use('/guidelist', guidelist);

// Default route
const getRoutes = (req, res) => {
	res.json({
		routes: [
			'/',
			'/subscriber',
			'/guidelist'
		]
	});
};

app.get('/', getRoutes);

export default async (context) => await app.attach(context);