import AppExpress from "@itznotabug/appexpress";
import { completeGuidelist, sendGuidelist } from "./guidelist.service.js";

const router = new AppExpress.Router();

router.post("/", async (req, res, log, error) => {
	try {
		const payload = req.bodyJson;
		log(`Payload: ${JSON.stringify(record)}`);
		switch (payload.type) {
			case "INSERT":
				await sendGuidelist(payload);
				break;
			case "UPDATE":
				await completeGuidelist(payload);
				break;
			default:
				throw new Error("Invalid type");
		}
		res.send("Guidelist sent");
	} catch (err) {
		error(err);
		return res.json({
			status: 400,
			message: err.message,
		});
	}
});

export default router;

