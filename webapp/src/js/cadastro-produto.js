import api from "./clientApi.js";
import { Toast } from "bootstrap";

let modoEdicao = false;

const query = window.location.search;
const urlParams = new URLSearchParams(query);
modoEdicao = urlParams.has("id");

if (modoEdicao) {
  prepararTelaParaEdicao();
}

document.getElementById("form-criar-produto").onsubmit = () => {
  if (modoEdicao) editarProduto();
  else criarProduto();
  return false;
};

async function editarProduto() {
  try {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");

    document.getElementById("botao-criar-produto").setAttribute("disabled", "");
    const descricao = document.getElementById("input-descricao").value;
    const valor = document.getElementById("input-valor").value;

    if (!descricao || !valor) return;

    await api.put(`/produto/${id}`, {
      descricao,
      valor,
    });

    window.location = "/gestao-produto.html";
  } catch (error) {
    document.getElementById("erro-criar-produto").classList.remove("d-none");
    document.getElementById("erro-criar-produto").innerText =
      error.response.data.erro;
  } finally {
    document.getElementById("botao-criar-produto").removeAttribute("disabled");
  }
}

async function criarProduto() {
  try {
    document.getElementById("botao-criar-produto").setAttribute("disabled", "");
    const descricao = document.getElementById("input-descricao")?.value;
    const valor = document.getElementById("input-valor")?.value;

    if (!descricao || !valor) return;

    await api.post("/produto", {
      descricao,
      valor,
    });
    window.location.pathname = "/gestao-produto.html";
  } catch (error) {
    document.getElementById("erro-criar-produto").classList.remove("d-none");
    document.getElementById("erro-criar-produto").innerText = error;
  } finally {
    document.getElementById("botao-criar-produto").removeAttribute("disabled");
  }
}

async function carregarProdutoParaEdicao() {
  try {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");

    const produto = await api.get(`/produto/${id}`);

    document.getElementById("input-descricao").value = produto.data.descricao;
    document.getElementById("input-valor").value = produto.data.valor;
  } catch (error) {
    const toastErro = document.getElementById("toast-erro-produto");
    Toast.getOrCreateInstance(toastErro).show();
  }
}

function prepararTelaParaEdicao() {
  document.getElementById("titulo-pagina").innerText = "Edição de produto";
  document.getElementById("botao-criar-produto").innerText = "Editar produto";
  carregarProdutoParaEdicao();
}
