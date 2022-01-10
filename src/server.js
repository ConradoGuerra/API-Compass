const app = require("./app");
const sequelize = require("../src/config/database");

//Listening to the port 8080 | Conectando à porta 8080
sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 8080, () => console.log("Server online!"));
  })
  .catch((err) => console.log(err));
