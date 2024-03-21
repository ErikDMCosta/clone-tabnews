// /api/v1/status

function status(request, response) {
  // SEM FORMATO
  // response.status(200).send("alunos do curso.dev são pessoas acima da média");
  // UTF-8
  response.status(200).json({ chave: "valor - são pessoas acima da média" });
}

export default status;
 