// /api/v1/status
import database from "infra/database.js";

async function status(request, response) {
  // SEM FORMATO
  // response.status(200).send("alunos do curso.dev são pessoas acima da média");
  // UTF-8
  // console.log(database);
  // const result = await database.query('SELECT 1 + 1;');
  // console.log(result.rows);
  // response.status(200).json({ chave: "valor - são pessoas acima da média" });

  // response.status(200).json({});

  // const updatedAt = Date.now();
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseConnectionResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseConnectionResult.rows[0].max_connections;
  // console.log(databaseVersionResult);

  // const databaseOpenedConnectionsResult = await database.query("SELECT * FROM pg_stat_activity;");

  // const databaseName = "local_db";
  // const databaseName = request.query.databaseName;
  const databaseName = process.env.POSTGRES_DB;
  // console.log(`Banco de Dados selecionado: ${databaseName}`);

  // const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname='local_db';");
  // const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname='" + databaseName + "';");
  // const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname='';");
  // const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname='';';");
  // const databaseOpenedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname=''; SELECT pg_local(4); --';");
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
    // `"SELECT count(*)::int FROM pg_stat_activity WHERE datname='${databaseName}';"`,
  }); // Placeholder ${}

  // console.log(databaseOpenedConnectionsResult.rows);
  // console.log(databaseOpenedConnectionsResult.rows.length);
  // const databaseOpenedConnectionValue = databaseOpenedConnectionsResult.rows.length;
  const databaseOpenedConnectionValue =
    databaseOpenedConnectionsResult.rows[0].count;

  // console.log(databaseOpenedConnectionValue);

  response.status(200).json({
    // updated_at: "textomaluco",
    // updated_at: null,
    updated_at: updatedAt,
    dependences: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionValue,
      },
    },
  });
}

export default status;
