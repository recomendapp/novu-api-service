import AppExpress from "@itznotabug/appexpress";
import { createSubscriber, deleteSubscriber, updateSubscriber } from "./subscriber.service.js";
import { supabase } from "../../lib/supabase.js";
import novu from "../../lib/novu.js";

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
router.post("/", async (req, res, log, error) => {
  try {
    const payload = req.bodyJson;
    log(`Payload: ${JSON.stringify(payload)}`);
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
  } catch (err) {
    error(err);
    return res.json({
      status: 400,
      message: err.message,
    });
  }
});

/**
 * @swagger
 * /subscriber/sync:
 *  post:
 *   summary: Sync all subscribers
 */
router.post("/sync", async (req, res, log, error) => {
  try {
    const { data: users, error: err } = await supabase
      .from('user')
      .select('*');

    if (err) {
      throw new Error(err.message);
    }

    await novu.subscribers.bulkCreate(users.map(user => ({
      subscriberId: user.id,
      avatar: user.avatar_url,
      data: {
        username: user.username,
        full_name: user.full_name
      },
      locale: user.language
    })));

    res.send("Synced all subscribers");
  } catch (err) {
    error(err);
    return res.json({
      status: 400,
      message: err.message,
    });
  }
});


export default router;