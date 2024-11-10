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
 *    summary: Create, update or delete a subscriber
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

/**
 * @swagger
 * /subscriber/sync:
 *  post:
 *   summary: Sync all subscribers
 */
router.post("/sync", async (req, res, next) => {
  try {
    const { data: users, error } = await supabase
      .from('user')
      .select('*, id(email, phone)');

    if (error) {
      throw new Error(error.message);
    }

    if (error) {
      throw new Error(error.message);
    }

    console.log(`Users: ${JSON.stringify(users)}`);
    res.send("Synced all subscribers");
  } catch (error) {
    next(error);
  }
});


export default router;