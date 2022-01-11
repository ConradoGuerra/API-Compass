# Projeto Compass - Teste - Entrevista para a vaga "Pessoa Desenvolvedora Back-end Node.JS | Integrações & Microsserviços"

## Tabela de conteúdos

- [Sobre](#Sobre)
- [Instalação](#Instalação)
   * [Como usar](#como-usar)
   * [Testes](#testes)
   * [Desenvolvimento](#desenvolvimento)
   * [Tecnologias](#tecnologias)


Sobre
======

Projeto desenvolvido com o intuito de realizar a prova técnica requerida, o qual será submetido à avaliação técnica.

Essa API possui 5 end-poins:
- Criação do usuário - '/users/createUser'
- Atualização do usuário - '/users/updateUser/:userId'
- Exclusão do usuário - '/users/deleteUser/:userId'
- Busca do usuário pelo nome - '/users/getByUserName/:userName'
- Busca do usuário pelo id - '/users/getByUserId/:userId'
- Criação da cidade - '/cities/createCity'
- Busca da cidade pelo nome - '/cities/getCityByName/:cityName'
- Busca da cidade pelo estado - '/cities/getStateByName/:stateName'

Instalação
==========

### Clone este repositório:
- $ git clone <https://github.com/ConradoGuerra/Compass.git>

### Você deve possuir instalado o node.js:
- https://nodejs.org/en/

#### Após a instalação do node.js você deverá instalar o pacote Yarn:
- $ npm i -global yarn

##### Por fim, você pode rodar a aplicação para que sejam instaladas as dependências:
- $ yarn start

Como usar
=========

No projeto serão criadas duas tabelas, uma para cidades e outra de usuários.

Na tabela cidade (cities) os dados requeridos são:
- Cidade
- Estado

Na tabela usuário (users) os dados requeridos são:
- Nome completo
- Gênero
- Data de nascimento
- Cidade

Ao criar a cidade e o usuários será possibilitado ao usuário:
- Criar cidade 
- Buscar pela cidade 
- Buscar pelo estado 
- Criar usuário
- Atualizar o usuário
- Remover usuário
- Buscar usuário pelo nome
- Buscar usuário pelo id

<strong> É importante destacar que para criar um usuário você necessita que ao menos uma cidade esteja criada, para que a cidade escolhida pelo usuário vincule à tabela de cidades. </strong> 

Testes
===========

Para testar:
- $ yarn test

Desenvolvimento
===========

Para ambiente de desenvolvimento:
- $ yarn dev

Tecnologias
===========

As tecnologias utilizadas para o projeto foram:
- Node.Js
- Yarn
- Express
- Nodemon
- Jest
- Supertest
- Dotenv
- Sequelize
- Sqlite3
- Express-validator
