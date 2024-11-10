import AppExpress from "@itznotabug/appexpress";

// Routes
import subscriber from './routes/subscriber/subscriber.controller.js';

const app = new AppExpress();

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