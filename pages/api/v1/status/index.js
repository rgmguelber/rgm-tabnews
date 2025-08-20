import database from "infra/database.js";

async function getStatus(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query(
    "SELECT count(*) as opened_connections FROM pg_stat_activity WHERE datname = '${}';",
  );
  const databaseOpenedConnections =
    databaseOpenedConnectionsResult.rows[0].opened_connections;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: parseInt(databaseOpenedConnections),
      },
    },
  });
}

export default getStatus;
