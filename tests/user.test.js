const { sequelize } = require("../db/db");
const { User } = require("../models/User");

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Model", () => {
  test("should create a new user", async () => {
    const newUser = await User.create({
      username: "edgarpoe",
      name: "Edgar Allan Poe",
      password: "theraven",
      email: "edgar@writersworld.com",
    });

    expect(newUser).toBeDefined();
    expect(newUser.username).toBe("edgarpoe");
    expect(newUser.name).toBe("Edgar Allan Poe");
    expect(newUser.email).toBe("edgar@writersworld.com");
    expect(newUser.password).toBe("theraven");
  });

  test("should fail when required fields are missing", async () => {
    try {
      await User.create({
        //missing name
        //missing email
        username: "edgarpoe",
        password: "theraven",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe("SequelizeValidationError");
    }
  });

  test("should fail when email is not unique", async () => {
    await User.create({
      username: "LSanjyan",
      name: "Lilit",
      password: "Verizon123",
      email: "lilit@verizon.com",
    });

    try {
      await User.create({
        username: "DannyData",
        name: "Danny",
        password: "Verizon123",
        email: "lilit@verizon.com",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe("SequelizeUniqueConstraintError");
    }
  });
});
