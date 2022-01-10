const app = require("../../src/app");
const sequelize = require("../../src/config/database");
const request = require("supertest");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("City Controller", () => {
  describe("Create city in DB", () => {
    it("should create in DB and send a response status 201 with the exactly data sent", async () => {
      const response = await request(app).post("/cities/createCity").send({
        cityName: "Machado",
        stateName: "Minas Gerais",
      });

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.cityName).toBe("Machado");
      expect(response.body.data.stateName).toBe("Minas Gerais");
    });

    it("should return an error for empty values", async () => {
      const response = await request(app).post("/cities/createCity").send({
        cityName: "Machado   ",
        stateName: "     ",
      });

      const errorStatus = response.error.status;
      const errorTextParsed = JSON.parse(response.error.text);
      const errorMessage = errorTextParsed.message;

      expect(errorStatus).toBe(422);
      expect(response).toBeDefined();
      expect(errorMessage).toBe("Invalid state name.");
    });

    it("should not create when already exists the exactly city and state", async () => {
      const cityName = "Machado";
      const stateName = "Minas Gerais";

      const response = await request(app).post("/cities/createCity").send({
        cityName: cityName,
        stateName: stateName,
      });

      const errorStatus = response.error.status;
      const errorTextParsed = JSON.parse(response.error.text);
      const errorMessage = errorTextParsed.message;

      expect(errorStatus).toBe(409);
      expect(errorMessage).toBe("City and State already exist.");
    });
  });

  describe("Get cities and states in DB", () => {
    it('should get a city from database with name "Machado        "', async () => {
      const response = await request(app).get(
        "/cities/getCityByName/Machado        "
      );

      const parsedData = JSON.parse(response.text);
      const cityName = parsedData.data[0].cityName;

      expect(response.status).toBe(200);
      expect(parsedData.message).toBe("Cities fetched successfully!");
      expect(cityName).toBe("Machado");
    });

    it('should get a state from database with name "Minas Gerais        "', async () => {
      const response = await request(app).get(
        "/cities/getStateByName/Minas Gerais        "
      );

      const parsedData = JSON.parse(response.text);
      const stateName = parsedData.data[0].stateName;

      expect(response.status).toBe(200);
      expect(parsedData.message).toBe("States fetched successfully!");
      expect(stateName).toBe("Minas Gerais");
    });
  });
});
