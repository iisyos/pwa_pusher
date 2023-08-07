const express = require("express");
const router = express.Router();
const webPush = require("web-push");
const cors = require("cors");

// Enable All CORS Requests
router.use(cors());

require('dotenv').config()


// Set VAPID Details
webPush.setVapidDetails(
  "mailto:hoge@example.com",
  process.env.VALID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

router.post("/sendNotification", async function (req, res) {
  const subscription = req.body.subscription;
  const payload = "Hello!";
  try {
    await webPush.sendNotification(
      subscription,
      JSON.stringify({
        body: payload,
      })
    );
    res.status(200).json({ message: "Notification sent." });
  } catch (error) {
    console.error("Error sending notification, reason: ", error);
    res.sendStatus(500);
  }
});

module.exports = router;
