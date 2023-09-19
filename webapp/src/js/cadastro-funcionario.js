import api from "./clientApi.js";
import { Toast } from "bootstrap";

let modoEdicao = false;

const query = window.location.search;
const urlParams = new URLSearchParams(query);
modoEdicao = urlParams.has("id");

if (modoEdicao) {
  prepararTelaParaEdicao();
}

document.getElementById("form-criar-funcionario").onsubmit = () => {
  if (modoEdicao) editarFuncionario();
  else criarFuncionario();
  return false;
};

async function editarFuncionario() {
  try {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");

    document
      .getElementById("botao-criar-funcionario")
      .setAttribute("disabled", "");
    const nome = document.getElementById("input-nome").value;
    const email = document.getElementById("input-email").value;

    if (!nome || !email) return;

    await api.put(`/funcionario/${id}`, {
      nome,
      email,
    });

    window.location = "/gestao-funcionario.html";
  } catch (error) {
    document
      .getElementById("erro-criar-funcionario")
      .classList.remove("d-none");
    document.getElementById("erro-criar-funcionario").innerText =
      error.response.data.erro;
  } finally {
    document
      .getElementById("botao-criar-funcionario")
      .removeAttribute("disabled");
  }
}

async function criarFuncionario() {
  try {
    document
      .getElementById("botao-criar-funcionario")
      .setAttribute("disabled", "");
    const nome = document.getElementById("input-nome").value;
    const email = document.getElementById("input-email").value;

    if (!nome || !email) return;

    await api.post("/funcionario", {
      nome,
      email,
    });
    window.location.pathname = "/gestao-funcionario.html";
  } catch (error) {
    document
      .getElementById("erro-criar-funcionario")
      .classList.remove("d-none");
    document.getElementById("erro-criar-funcionario").innerText = error;
  } finally {
    document
      .getElementById("botao-criar-funcionario")
      .removeAttribute("disabled");
  }
}

async function carregarFuncionarioParaEdicao() {
  try {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id");

    const funcionario = await api.get(`/funcionario/${id}`);

    document.getElementById("input-nome").value = funcionario.data.nome;
    document.getElementById("input-email").value = funcionario.data.email;
  } catch (error) {
    const toastErro = document.getElementById("toast-erro-funcionario");
    Toast.getOrCreateInstance(toastErro).show();
  }
}

function prepararTelaParaEdicao() {
  document.getElementById("titulo-pagina").innerText = "Edição de funcionário";
  document.getElementById("botao-criar-funcionario").innerText =
    "Editar funcionário";
  carregarFuncionarioParaEdicao();
}
