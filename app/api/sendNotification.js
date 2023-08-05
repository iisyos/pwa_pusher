const api = async (req, res) => {
  // eslint-disable-next-line no-undef
  res.status(200).json({ name: process.env.VITE_VAPID_PUBLIC ?? "hoge"});
};

export default api;
