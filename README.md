# cloud-store

## Inicialização do projeto

1. Na pasta `api`, criar um arquivo `.env` que irá conter as variáveis de ambiente necessárias para inicialização mais segura do app.

2. Pegar as chaves enviadas no comentário da atividade na plataforma da Unifor.

3. Preencher o conteúdo do arquivo no seguinte modelo:

```
APP_ID=chave
JS_KEY=chave
```

4. Na pasta raiz do projeto, rodar o comando:

```shell
yarn start
```

Esse comando irá rodar tanto o front-end quanto API da aplicação.

5. (Opcional) Caso prefira rodar os comandos separadamente:
   5.1. Rodar API:
   ```shell
   cd api && node app.js
   ```
   5.2. Abrir outro terminal e rodar front-end:
   ```shell
   cd webapp && yarn start
   ```
