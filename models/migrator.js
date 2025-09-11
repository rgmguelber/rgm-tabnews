import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "path";

const defaultgetHandlerOptions = {
  dryRun: true,
  dir: join("infra", "migrations"),
  direction: "up",
  verbose: true,
  getHandlerTable: "pgmigrations",
};

async function listPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultgetHandlerOptions,
      dbClient,
    });

    return pendingMigrations;
  } finally {
    if (dbClient) await dbClient.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultgetHandlerOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    if (dbClient) await dbClient.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
