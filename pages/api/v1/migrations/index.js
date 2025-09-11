import { createRouter } from "next-connect";
import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "path";
import controller from "infra/controller.js";

// Define quais métodos são permitidos através do next-connect
const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

// ************************************************************

const defaultgetHandlerOptions = {
  dryRun: true,
  dir: join("infra", "migrations"),
  direction: "up",
  verbose: true,
  getHandlerTable: "pgmigrations",
};

async function getHandler(req, res) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultgetHandlerOptions,
      dbClient,
    });
    res.status(200).json(pendingMigrations);
  } finally {
    if (dbClient) await dbClient.end();
  }
}

async function postHandler(req, res) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedgetHandler = await migrationRunner({
      ...defaultgetHandlerOptions,
      dbClient,
      dryRun: false,
    });
    if (migratedgetHandler.length > 0) {
      return res.status(201).json(migratedgetHandler);
    }

    return res.status(200).json(migratedgetHandler);
  } finally {
    if (dbClient) await dbClient.end();
  }
}

// TODO: Continuar do video Padronizar Controllers (Abstração Nível 2) - 09:55
