test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  // console.log(response);

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // console.log(responseBody);
  // expect(responseBody.updated_at).toBeDefined();

  const parseUpdateAt = new Date(responseBody.updated_at).toISOString();
  // console.log(parseUpdateAt);
  expect(responseBody.updated_at).toEqual(parseUpdateAt);

  expect(responseBody.dependences.database.version).toEqual("16.2");
  expect(responseBody.dependences.database.max_connections).toEqual(100);
  expect(responseBody.dependences.database.opened_connections).toEqual(1);
});

// test.only("Teste de SQL Injection", async () => {
test("Teste de SQL Injection", async () => {
  // await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
  // await fetch("http://localhost:3000/api/v1/status?databaseName=");
  // await fetch("http://localhost:3000/api/v1/status?databaseName=';");
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_local(4); --",
  );
});
