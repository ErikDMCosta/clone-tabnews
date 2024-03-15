const calculadora = require("../models/calculadora.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  // console.log(resultado);
  expect(resultado).toBe(4);
});

test("somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  // console.log(resultado);
  expect(resultado).toBe(105);
});

test("somar 'banana' deveria retornar 'Erro'", () => {
  const resultado = calculadora.somar('banana', 100);
  // console.log(resultado);
  expect(resultado).toBe('Erro');
});

// test("espero que 1 seja 1", () => {
//   expect(1).toBe(1);
// });

// test("nome do teste", () => {
//   console.log("E assim, funciona?");
// });

// test("testando outra condição do meu sistema", () => {
//   console.log("outro teste");
// });

// test("nome do teste", callbackFunction);

// function callbackFunction() {
//   console.log("E assim, funciona?");
// }
