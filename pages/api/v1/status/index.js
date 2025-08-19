import database from "infra/database.js";

async function getStatus(req, res) {
  // const result = await database.query("SELECT 1+1;");

  const updatedAt = new Date().toISOString();

  res.status(200).json({
    updated_at: updatedAt,
  });
}

export default getStatus;
