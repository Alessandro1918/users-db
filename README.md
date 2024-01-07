# users-db

## 🚀 Projeto
Exercício de backend - Sistema de Cadastro de Usuários.</br>
Fornecer um cadastro de usuários com todas a operações típicas de operação de banco de dados ([CRUD](https://pt.wikipedia.org/wiki/CRUD)).

<div align="center">
  <img src="github_assets/swagger.png" alt="routes" title="routes" width="75%"/>
  <p>Documentação das rotas:
    <a href="http://localhost:4000/api-docs">
      http://localhost:4000/api-docs
    </a>
  </p>
</div>

## 🛠️ Tecnologias
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com)
- [Prisma](https://www.prisma.io)
- [Swagger](https://swagger.io)

## 🧊 Cool features
- Autenticação de usuários com [JWT](https://jwt.io) (rota de login) para uso das rotas autenticadas.
- Login compara a senha fornecida com o [hash](https://pt.wikipedia.org/wiki/Função_hash_criptográfica) da senha cadastrada (senhas nunca devem ser salvas em plaintext).

## 🗂️ Utilização

### 🐑🐑 Clonando o repositório:

```bash
  $ git clone url-do-projeto.git
```

### ▶️ Rodando o App:

- Apontar o terminal para o diretório do servidor:
```bash
  $ cd users-db
```

- Download das dependências para a pasta <code>node_modules</code>:
```bash
  $ npm install
```

- Criar a instância da base de dados MySQL local (arquivo <code>users-db.mwb</code>), pelo seu cliente MySQL (terminal ou Workbench).

- Criar o arquivo <code>.env</code>, de acordo com o arquivo <code>.env.example</code>.

- Acrescentar a string de conexão ao arquivo <code>.env</code>, de acordo com o arquivo <code>.env.example</code>, no padrão:</br>
<code>DATABASE_URL = “mysql://USER:PASSWORD@HOST:PORT/DATABASE”</code></br>
Sendo:</br>
<code>USER</code>: Nome do seu usuário local (ex: "root")</br>
<code>PASSWORD</code>: Senha do seu usuário local (ex: "1234")</br>
<code>HOST</code>: Endereço da sua base de dados (ex: "localhost")</br>
<code>PORT</code>: Porta da base de dados (mysql tipicamante é "3306")</br>
<code>DATABASE</code>: Nome do arquivo .mwb salvo localmente (ex: "users-db")</br>

- Opcional: abrir um painel de controle da base de dados no navegador, para visualização e/ou edição:
(rodar o comando em um terminal separado)
```bash
  $ npx prisma studio
```

- Rodar o app:
```bash
  $ npm run dev
```

Consultar a documentação em: [localhost:4000/api-docs](http://localhost:4000/api-docs)

## 📋 TODO:
- Implementar tabela de admins (operadores habilitados a fazer login e manipular os registros de "usuários"). Atualmente só 1 admin cadastrado hardcoded: username "alessandro_1", senha "1234".
- Tratamento de erro se usuário não for encontrado (rotas get / update / delete).
- Salvar nome do admin responsável pelo update / delete do usuário.
