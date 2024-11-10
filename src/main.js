import AppExpress from "@itznotabug/appexpress";

// Routes
import subscriber from './routes/subscriber/subscriber.controller.js';

const app = new AppExpress();

app.use('/subscriber', subscriber)

// const getRoutes = (req, res) => {
// 	res.json({
// 		routes: [
// 			'/',
// 		]
// 	});
// };

// app.get('/', getRoutes);

export default async (context) => await app.attach(context);