const app = require("../../src/app");
const sequelize = require("../../src/config/database");
const request = require("supertest");
const City = require("../../src/models/cityModel");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Controller", () => {
  describe("Create users in DB", () => {
    it("should not create an user if a value is missing ", async () => {
      const response = await request(app).post("/users/createUser").send({
        fullName: "Conrado Guerra",
        gender: "",
        birthday: "1988-07-27",
        cityId: "1",
      });

      const errorStatus = response.error.status;
      const errorTextParsed = JSON.parse(response.error.text);
      const errorMessage = errorTextParsed.message;

      expect(errorStatus).toBe(422);
      expect(errorMessage).toBe("Invalid gender.");
    });

    it("should not create an user if the cityId does not exist", async () => {
      const response = await request(app).post("/users/createUser").send({
        fullName: "Conrado Guerra",
        gender: "masculino",
        birthday: "1988-07-27",
        cityId: "100",
      });

      const errorStatus = response.error.status;
      const errorTextParsed = JSON.parse(response.error.text);
      const errorMessage = errorTextParsed.message;

      expect(errorStatus).toBe(422);
      expect(errorMessage).toBe(
        "No city found, please create a city before create this user."
      );
    });

    it("should create an user successfully", async () => {
      const createdCity = await City.findOrCreate({
        where: { cityName: "São Paulo" },
        defaults: {
          stateName: "São Paulo",
        },
      });

      const cityId = createdCity[0].id;
      const response = await request(app).post("/users/createUser").send({
        fullName: "Conrado Guerra",
        gender: "masculino",
        birthday: "1988-07-27",
        cityId: cityId,
      });

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("age");
      expect(response.body.data.fullName).toBe("Conrado Guerra");
    });
  });

  describe("Get users in DB", () => {
    it('should get an user from database with the name "Conrado        "', async () => {
      const response = await request(app).get(
        "/users/getByUserName/Conrado        "
      );

      const parsedData = JSON.parse(response.text);
      const userName = parsedData.data[0].fullName;

      expect(response.status).toBe(200);
      expect(parsedData.message).toBe("Users fetched successfully!");
      expect(userName).toBe("Conrado Guerra");
    });

    it("should get a user from database with the userId", async () => {
      const response = await request(app).get("/users/getByUserId/1        ");

      const parsedData = JSON.parse(response.text);
      const userId = parsedData.data.id;

      expect(response.status).toBe(200);
      expect(parsedData.message).toBe("User fetched successfully!");
      expect(userId).toBe(1);
    });
  });

  describe("Update user in DB", () => {
    it("should update the username from specific userId", async () => {
      const response = await request(app)
        .patch("/users/updateUser/1        ")
        .send({
          fullName: "Conrado M. V. Guerra",
        });

      const parsedData = JSON.parse(response.text);
      const userId = parsedData.data.id;

      expect(response.status).toBe(200);
      expect(parsedData.message).toBe("User updated successfully.");
      expect(userId).toBe(1);
    });

    it("should throw an error with incorrect params", async () => {
      const response = await request(app)
        .patch("/users/updateUser/aaaaa        ")
        .send({
          fullName: "Conrado M. V. Guerra",
        });

      const status = response.status;
      const parsedData = JSON.parse(response.text);

      expect(status).toBe(422);
      expect(parsedData.message).toBe('Invalid user id.');
    });
  });

  describe("Delete user in DB", () => {
    it("should delete an user from database with a specific id passed by params", async () => {
      const response = await request(app).delete("/users/deleteUser/      1  ");

      const parsedData = JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(parsedData.message).toBe("User deleted successfully.");
    });
  });
});
