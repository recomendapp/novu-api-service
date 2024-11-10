const authMiddleware = async (req, res, log, error) => {
	try {
		const { authorization } = req.headers;
		
		// Check if authorization is equal to AUTH_TOKEN from .env
		if (authorization !== process.env.AUTH_TOKEN) {
			throw new Error('Unauthorized');
		}
	} catch (err) {
		error(err);
		return res.json({
			status: 401,
			message: 'Unauthorized'
		});
	}
}

export default authMiddleware;