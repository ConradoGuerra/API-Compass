const express = require("express");
const sequelize = require("./config/database");

// Importing userRoutes / Importanto rotas dos usuários
const userRoutes = require("./routes/userRoutes");
// Importing cityRoutes / Importanto rotas das cidades
const cityRouter = require("./routes/cityRoutes");

const User = require("./models/userModel");
const City = require("./models/cityModel");

const app = express();

//Parsing json data
//Separando dados .json
app.use(express.json());

//Setting especial headers to avoid CORS error
//Setando headers específicos para evitar erro CORS
app.use((req, res, next) => {
  //Allow all the browsers to access the data
  //Permição para todos os browsers acessarem os dados
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Allow to use specific methods and headers
  //Permição de métodos e headers específicos
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Using the user middleware user | Usando o middleware users
app.use("/users", userRoutes);
//Using the city middleware user | Usando o middleware city
app.use("/cities", cityRouter);

//Creating an error middleware | Criando um middleware para erros
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//Association one-to-one, One user belongs to one city | Associação de um para um, um usuário pertence a uma cidade
User.belongsTo(City);

//Connecting to the database | Conexação com o banco de dados
sequelize
  .sync()
  //   .sync({ force: true })
  .then(() => {
    console.log("Database connected successfully!");

    //Listening to the port 8080 | Conectando à porta 8080
    app.listen(8080, () => console.log("Server online!"));
  })
  .catch((err) => console.log(err));
