// /api/v1/status
import database from "infra/database.js";

async function status(request, response) {
  // SEM FORMATO
  // response.status(200).send("alunos do curso.dev são pessoas acima da média");
  // UTF-8
  // console.log(database);
  const result = await database.query('SELECT 1 + 1;');
  console.log(result.rows);
  response.status(200).json({ chave: "valor - são pessoas acima da média" });
}

export default status;
