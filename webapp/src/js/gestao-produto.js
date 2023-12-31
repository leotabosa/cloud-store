import api from "./clientApi.js";
import { Toast } from "bootstrap";

carregarProdutos();

async function removerProduto(id) {
  try {
    await api.delete(`/produto/${id}`);
    await carregarProdutos();
    const toastErro = document.getElementById("toast-sucesso-produto-gestao");

    Toast.getOrCreateInstance(toastErro).show();
  } catch (error) {
    const toastErro = document.getElementById("toast-erro-produto-gestao");
    const texto = document.getElementById("texto-toast-erro-produto-gestao");

    texto.innerText = "Não foi possível remover o funcionário.";
    Toast.getOrCreateInstance(toastErro).show();
  }
}

async function carregarProdutos() {
  try {
    const produtos = await api.get("/produto");

    const tabelaProdutos = document.getElementById("tabela-produtos");
    tabelaProdutos.innerHTML = "";
    produtos.data.forEach((produto) => {
      const elemento = document.createElement("tr");

      const descricao = document.createElement("td");
      descricao.innerText = produto.descricao;
      elemento.insertAdjacentElement("beforeend", descricao);

      const valor = document.createElement("td");
      valor.innerText = produto.valor;
      elemento.insertAdjacentElement("beforeend", valor);

      const acoes = document.createElement("td");

      acoes.innerHTML = `<svg data-id="${produto.objectId}" class="icon icon-editar" title="Editar"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil" viewBox="-4 -4 24 24"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/> </svg>
        <svg data-id="${produto.objectId}" class="icon icon-excluir" title="Excluir" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="-4 -4 24 24"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/> </svg>`;

      elemento.insertAdjacentElement("beforeend", acoes);

      tabelaProdutos.insertAdjacentElement("beforeend", elemento);
    });

    document.querySelectorAll("td > .icon-excluir").forEach((el) => {
      el.addEventListener("click", async (event) => {
        event.currentTarget.style = "pointer-events: none;";
        await removerProduto(event.currentTarget.getAttribute("data-id"));
        if (event.currentTarget)
          event.currentTarget.style = "pointer-events: unset;";
      });
    });

    document.querySelectorAll("td > .icon-editar").forEach((el) => {
      el.addEventListener("click", (event) => {
        window.location.pathname = "cadastro-produto.html";
        window.location = `cadastro-produto.html?id=${event.currentTarget.getAttribute(
          "data-id"
        )}`;
      });
    });
  } catch (error) {
    const toastErro = document.getElementById("toast-erro-produto-gestao");
    const texto = document.getElementById("texto-toast-erro-produto-gestao");

    texto.innerText = "Não foi possível carregar os funcionários.";
    Toast.getOrCreateInstance(toastErro).show();
  }
}
