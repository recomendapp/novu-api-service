import AppExpress from "@itznotabug/appexpress";
import { createSubscriber, deleteSubscriber, updateSubscriber } from "./subscriber.service.js";

const router = new AppExpress.Router();

router.get("/", async (req, res) => {
  res.send("Subscriber");
});

/**
 * @swagger
 * /subscriber:
 *   post:
 *    summary: Create a new subscriber
 *   description: Create a new subscriber
 *  requestBody:
 *   required: true
 */
router.post("/", async (req, res, next) => {
  try {
    const payload = req.bodyJson;
    console.log(`Payload: ${JSON.stringify(payload)}`);
    switch (payload.type) {
      case "INSERT":
        await createSubscriber(payload);
        break;
      case "UPDATE":
        await updateSubscriber(payload);
        break;
      case "DELETE":
        await deleteSubscriber(payload);
        break;
      default:
        throw new Error("Invalid type");
    }
    res.send("Subscriber created");
  } catch (error) {
    next(error);
  }
});

export default router;