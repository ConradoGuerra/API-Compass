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

Esta API possui oito end-poins:
- Criação do usuário - */users/createUser*
- Atualização do usuário - */users/updateUser/:userId*
- Exclusão do usuário - */users/deleteUser/:userId*
- Busca do usuário pelo nome - */users/getByUserName/:userName*
- Busca do usuário pelo id - */users/getByUserId/:userId*
- Criação da cidade - */cities/createCity*
- Busca da cidade pelo nome - */cities/getCityByName/:cityName*
- Busca da cidade pelo estado - */cities/getStateByName/:stateName*

Instalação
==========

#### Clone este repositório:
 $ git clone <https://github.com/ConradoGuerra/Compass.git>

#### Você deve possuir instalado o node.js:
 https://nodejs.org/en/

#### Após a instalação do node.js você deverá instalar o pacote Yarn:
 $ npm i -global yarn

#### Por fim, você executa a aplicação para que sejam instaladas as dependências com o comando:
 $ yarn start

Como usar
=========

No projeto serão criadas duas tabelas, uma para cidades (cities) e outra para usuários (users).

Na tabela cidades (cities) os dados requeridos para a criação são:
- Cidade
- Estado

Na tabela usuários (users) os dados requeridos para a criação são:
- Nome completo
- Data de nascimento
- Gênero
- Cidade

Ao criar a cidade e o usuários será possibilitado:
- Buscar pela cidade 
- Buscar pelo estado 
- Atualizar o usuário
- Remover usuário
- Buscar usuário pelo nome
- Buscar usuário pelo id

### Obs: É importante destacar que para criar um usuário você necessita que ao menos uma cidade esteja criada, para que a cidade escolhida pelo usuário vincule à tabela de cidades.

Testes
======

Para testar:
- $ yarn test

Desenvolvimento
===============

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
