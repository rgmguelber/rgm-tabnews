import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

export default async function Status(req, res) {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersion = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query(
      "SHOW max_connections;",
    );
    const databaseMaxConnections =
      databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const databaseOpenedConnections =
      databaseOpenedConnectionsResult.rows[0].count;

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
  } catch (error) {
    const publickErrorObject = new InternalServerError({ cause: error });

    console.log("\n Erro dentro do catch do controller:");
    console.error(publickErrorObject);

    res.status(500).json(publickErrorObject);
  }
}
