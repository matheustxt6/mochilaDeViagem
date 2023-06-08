// Obtém referências aos elementos do formulário e da lista
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");

// Obtém os itens armazenados no localStorage ou define um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Itera sobre os itens existentes e cria elementos correspondentes na lista
itens.forEach((elemento) => {
  criaElemento(elemento);
});

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // Obtém os valores dos campos de entrada
  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  // Verifica se o item já existe na lista
  const existe = itens.find((elemento) => elemento.nome === nome.value);

  // Cria um objeto com o nome, quantidade e, se existir, o ID do item
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    // Se o item já existe, atualiza o elemento correspondente na página
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);

    // Atualiza o item correspondente no array itens
    itens[itens.findIndex((elemento) => elemento.id === existe.id)] = itemAtual;
  } else {
    // Se o item é novo, atribui um ID e cria um novo elemento na lista
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    criaElemento(itemAtual);

    // Adiciona o novo item ao array itens
    itens.push(itemAtual);
  }

  // Armazena os itens atualizados no localStorage
  localStorage.setItem("itens", JSON.stringify(itens));

  // Limpa os campos de entrada do formulário
  nome.value = "";
  quantidade.value = "";
});

// Função para criar um novo elemento na lista
function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaDeleta(item.id));

  lista.appendChild(novoItem);
}

// Função para atualizar a quantidade de um elemento na lista
function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

// Função para criar um botão de exclusão
function botaDeleta(id) {
  const elementobotao = document.createElement("button");
  elementobotao.innerHTML = "x";
  elementobotao.addEventListener("click", function () {
    deleteElemento(this.parentNode, id);
  });

  return elementobotao;
}

// Função para excluir um elemento da lista
function deleteElemento(tag, id) {
  tag.remove();

  // Remove o item correspondente do array itens
  itens.splice(itens.findIndex((elemento) => elemento.id === id), 1);

  // Armazena os itens atualizados no localStorage
  localStorage.setItem("itens", JSON.stringify(itens));
}

// Um array (ou arranjo) é uma estrutura de dados que permite armazenar múltiplos valores em uma única variável.
// No JavaScript, um array é uma coleção ordenada de elementos, onde cada elemento é identificado por um índice.
// Os índices são números inteiros não negativos, começando por 0 para o primeiro elemento do array.
// Os elementos de um array podem ser de diferentes tipos de dados, como números, strings, objetos, funções, etc.
// Um array pode conter qualquer combinação de tipos de dados e seu tamanho pode ser alterado dinamicamente.
// No código acima, o array "itens" é usado para armazenar os itens da mochila de viagem, cada item é um objeto com propriedades como "nome" e "quantidade".
