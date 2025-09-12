import { createRouter } from "next-connect";

import controller from "infra/controller.js";
import user from "models/user.js";

// Define quais métodos são permitidos através do next-connect
const router = createRouter();

// router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

// ************************************************************

async function getHandler(req, res) {
  // const pendingMigrations = await migrator.listPendingMigrations();
  // return res.status(200).json(pendingMigrations);
}

async function postHandler(req, res) {
  const userInputValues = req.body;

  const newUser = await user.create(userInputValues);
  return res.status(201).json(newUser);
}
