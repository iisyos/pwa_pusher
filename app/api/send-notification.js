/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webPush = require('web-push');


webPush.setVapidDetails(
  'mailto:hoge@example.com',
  process.env.VITE_VAPID_PUBLIC,
  process.env.VITE_VAPID_PRIVATE,
);

const api = async (req, res) => {
  const subscription = req.body.subscription;
  const payload = "Hello!";
  try {
    await webPush.sendNotification(subscription, payload);
    res.status(200).json({ message: 'Notification sent.' });
  } catch (error) {
    console.error('Error sending notification, reason: ', error);
    res.sendStatus(500);
  }
};

module.exports = api;
