# Intuitive Care API

Este projeto foi desenvolvido com nodejs e express.

## Project Setup

### 1. Instalar as dependências do projeto
```sh
npm install
```

### 2. Subir o banco de dados (PostgreSQL) através do docker 

```sh
cd docker
docker-compose up -d --build
```

> ⚠️Caso a porta 5432 já esteja sendo utilizada em sua máquina, favor alterar o arquivo `docker-compose.yml` com alguma outra porta livre!
>Nesse caso também será necessário alterar o arquivo `src/database/dbConfig.js` com os novos dados.


### 3. Rodar o projeto

```sh
npm run dev
```

> O projeto irá rodar na porta 3000. Mas a porta também pode ser alterada no arquivo `src/index.js`

## Dados do arquivo CSV
Ao rodar o projeto pela primeira vez, ele automaticamente irá executar os seguintes passos:
1. Criar o database `intuitivecare`
2. Criar a tabela `operadoras_ans`
3. Fazer a leitura e importação do arquivo `src/assets/relatorio-cadop.csv` para a tabela `operadoras_ans`.

## Endpoints disponibilizados:
- GET `/operadoras-ans` - Lista as operadas cadastradas
-- Este endpoint retorna uma lista páginada
-- Pode receber os seguintes query params: `page`, `sort`, `campos para filtro` 

- GET `operadoras-ans/:id` - Retorna o registro com  o id informado
- POST `operadoras-ans` - Cria um novo registro
- PUT `operadoras-ans/:id` - Atualiza o registro com o id informado
- DELETE `operadoras-ans/:id` - Deleta o registro com o id informado
- GET `cep/:cep` - Busca o cep informado na webservice da viacep
