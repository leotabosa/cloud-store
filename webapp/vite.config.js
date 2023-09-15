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
        gestaoAdministrativa: path.resolve(
          __dirname,
          "src/gestao-administrativa.html"
        ),
        cadastroUsuario: path.resolve(__dirname, "src/cadastro-usuario.html"),
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
