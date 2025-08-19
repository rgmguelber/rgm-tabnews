import database from "../../../../infra/database.js";

async function getStatus(req, res) {
  const result = await database.query("SELECT 1+1;");

  console.log(result.rows);

  res.status(200).json({ status: "OK" });
}

export default getStatus;
