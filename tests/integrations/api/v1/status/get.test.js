test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  // Testa se o campo updated_at está presente e é uma data válida
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBeDefined();
  expect(parsedUpdatedAt).toBe(responseBody.updated_at);
});

// TODO: Continuar aqui da aula do dia 20 Database "Max Connections" no minuto zero.
