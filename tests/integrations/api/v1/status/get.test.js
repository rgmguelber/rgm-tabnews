import orchestrator from "infra/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // Testa se o campo updated_at está presente e é uma data válida
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(parsedUpdatedAt).toBe(responseBody.updated_at);

  // Testa se o campo database.version retorna a versão correta
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  // Testa se o campo dependencies.database.max_connections está presente
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});
