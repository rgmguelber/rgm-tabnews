function getStatus(req, res) {
  res.status(200).json({ status: "OK" });
}

export default getStatus;
