import AppExpress from "@itznotabug/appexpress";

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
    // Show NOVU API KEY FROM ENV
    console.log(process.env.NOVU_API_KEY);
    res.send("Subscriber created");
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /subscriber:
 *  put:
 *  summary: Update a subscriber
 * description: Update a subscriber
 * requestBody:
 * required: true
 */
router.put("/", async (req, res, next) => {
  try {
    res.send("Subscriber updated");
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /subscriber:
 *  delete:
 * summary: Delete a subscriber
 * description: Delete a subscriber
 */
router.delete("/", async (req, res, next) => {
  try {
    res.send("Subscriber deleted");
  } catch (error) {
    next(error);
  }
});

export default router;