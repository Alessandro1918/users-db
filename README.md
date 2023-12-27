# users-db

## 🚀 Projeto
Exercício de backend - Sistema de Cadastro de Usuários.</br>
Fornecer um cadastro de usuários com todas a operações típicas de operação de banco de dados ([CRUD](https://pt.wikipedia.org/wiki/CRUD)).

## 🛠️ Tecnologias
- [Node.js](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io)

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

- Criar a instância da base de dados local (arquivo <code>users-db.mwb</code>), pelo terminal ou pelo Workbench.

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
