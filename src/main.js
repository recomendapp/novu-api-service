import AppExpress from "@itznotabug/appexpress";
// Middlewares
import authMiddleware from './middlewares/auth.middleware.js';
// Routes
import subscriber from './routes/subscriber/subscriber.controller.js';

const app = new AppExpress();

// Middleware
app.middleware(authMiddleware);
// Routes
app.use('/subscriber', subscriber)

// Default route
const getRoutes = (req, res) => {
	res.json({
		routes: [
			'/',
			'/subscriber'
		]
	});
};

app.get('/', getRoutes);

export default async (context) => await app.attach(context);