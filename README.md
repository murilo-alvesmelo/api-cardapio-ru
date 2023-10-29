# API Rest - NodeJs + Express + Postgres
 
Api que alimenta os projetos [front-end-cardapio-ru](https://github.com/murilo-alvesmelo/front-end-cardapio-ru) e [app-cardapio-ru](https://github.com/murilo-alvesmelo/app-cardapio-ru)


## Requisitos
- node
- knex
- postgres


## Configurações
- 1
    - Copie o arquivo .env_example
    - Cole e renomeie para .env
    - Adicione qualquer string dentro do authSecret
- 2
    - Adicione o acesso ao seu Banco de Dados
    ````javascript
    module.exports = {
    client: "postgresql",
    connection: {
        host: "localhost",
        port: "5432",
        database: "",
        user: "postgres",
        password: "",
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
    };


## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:murilo-alvesmelo/api-cardapio-ru.git
```

Entre no diretório do projeto

```bash
  cd api-cardapio-ru
```

Instale as dependências

```bash
  npm install
```

Migrações das tabelas

```bash
  knex migrate:make create_table_users
  knex migrate:make create_table_cardapio 
```

Inicie a aplicação

```bash
  npm start
```


## Dependências utilizadas

- Web services
    - express
    - body-parser
    - cors
    - consign
- Segurança
    - bcrypt-nodejs
    - jwt-simple
    - passport
    - passport-jwt
- Conexão com o database
    - pg
    - knex
## Entidades do banco de dados

Para essa aplicação e criada uma integração com um servidor de banco de dados Postgres no localhost da sua maquina:

**Entidades da tabela users:**

```javascript

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("cpf").notNullable().unique();
    table.string("password").notNullable();
  });
};
```
**Entidades da tabela cardapio:**

```javascript

exports.up = function (knex) {
  return knex.schema.createTable("cardapio", (table) => {
    table.increments("id").primary();
    table.string("refeicao").notNullable();
    table.string("salada");
    table.string("guarnicao");
    table.string("leguminosas");
    table.string("carboidrato");
    table.dateTime("estimateAt");
    table.integer("userId").references("id").inTable("users").notNullable();
  });
};
```

### Rotas do CRUD de users

#### Envia os parâmetros para API para o cadastro do usuário
```http
   POST http://localhost:5000/signup
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`   | `string` | **Obrigatório**|
| `cpf`   | `string` | **Obrigatório**|
| `email`   | `string` | **Obrigatório**|
| `password`   | `string` | **Obrigatório**|

#### Envia os parâmetros para API para o login do usuário
```http
   POST http://localhost:5000/login
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`   | `string` | **Obrigatório**|
| `password`   | `string` | **Obrigatório**|


### Rotas do CRUD de cardapio

#### Traz todas as refeições

```http
   GET http://localhost:5000/cardapio/
```

#### Traz uma refeição por ID

```http
   GET http://localhost:5000/cardapio/${id}
```

#### Envia os parâmetros para API para o cadastro da refeição
```http
   POST http://localhost:5000/cardapio
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token` | `string`| **Obrigatório**|
| `refeicao`   | `string` | **Obrigatório**|
| `salada`   | `string` | |
| `guarnicao`   | `string` | |
| `leguminosas`   | `string` | |
| `carboidrato`   | `string` | |
| `estimateAt`   | `string` | |


#### Faz uma atualização no campo escolhido da refeição 
```http
   PUT http://localhost:5000/cardapio/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token` | `string`| **Obrigatório**|
| `cardapio`   | `object` | **Obrigatório**|
| `id`      | `number` | **Obrigatório**  |

#### Deleta a refeição pelo ID

```http
   DELETE http://localhost:5000/cardapio/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token` | `string`| **Obrigatório**|
| `cardapio`   | `object` | **Obrigatório**|
| `id`      | `number` | **Obrigatório**|


## Autores

- [@murilo-alvesmelo](https://github.com/murilo-alvesmelo)


## Licença
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[MIT](https://choosealicense.com/licenses/mit/)
