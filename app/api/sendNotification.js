const api = async (req, res) => {
  res.status(200).json({ name: import.meta.env.VITE_VAPID_PUBLIC ?? "hoge"});
};

export default api;
