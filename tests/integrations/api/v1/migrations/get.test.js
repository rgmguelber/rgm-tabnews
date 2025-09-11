import database from "infra/database.js";
import orchestrator from "infra/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("DROP schema public cascade; create schema public;");
});

describe("GET to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retriving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      // Verifica se o retorno é uma matriz
      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
