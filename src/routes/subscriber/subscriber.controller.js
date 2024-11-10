import AppExpress from "@itznotabug/appexpress";

const router = new AppExpress.Router();

router.get("/", async (req, res) => {
  res.send("Subscriber");
});

export default router;