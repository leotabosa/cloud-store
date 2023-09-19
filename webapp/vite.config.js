const path = require("path");
import dotenv from "dotenv";

dotenv.config();

export default {
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        gestaoFuncionario: path.resolve(
          __dirname,
          "src/gestao-funcionario.html"
        ),
        cadastroFuncionario: path.resolve(
          __dirname,
          "src/cadastro-funcionario.html"
        ),
        cadastroProduto: path.resolve(__dirname, "src/cadastro-produto.html"),
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
