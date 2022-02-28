const request = require("supertest");

const db = require("../database/connection");

const app = require("../app");

describe("Creation of new account", () => {
  beforeEach(async () => {
    await db("accounts").where("username", "tswizzle").del();
    // Deletes the account for a username before the next test tries to create an account for the same username.
  });

  test("Should create a new account", async () => {
    const response = await request(app)
      .post("/accounts")
      .send({
        newAccountData: {
          firstname: "Taylor",
          lastname: "Swift",
          username: "tswizzle",
          password: "badblood",
        },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("The account was created successfully");
  });
});

test("Should reject duplicate username", async () => {
  const response = await request(app)
    .post("/accounts")
    .send({
      newAccountData: {
        firstname: "Yemi",
        lastname: "Alade",
        username: "aladey",
        password: "johnny96",
      },
    });
  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Username is not available");
});

test("Should not create a new account due to missen fields", async () => {
  const response = await request(app)
    .post("/accounts")
    .send({
      newAccountData: {
        lastname: "Perry",
        username: "tperry",
        password: "madea1234",
      },
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("One or more required fields are missen");
});

test("Should reject password less than 8 characters", async () => {
  const response = await request(app)
    .post("/accounts")
    .send({
      newAccountData: {
        firstname: "James",
        lastname: "Blunt",
        username: "blunt",
        password: "madea",
      },
    });
  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Password must be more than 7 characters");
});

test("Should reject if username is less than 5 characters", async () => {
  const response = await request(app)
    .post("/accounts")
    .send({
      newAccountData: {
        firstname: "James",
        lastname: "Blunt",
        username: "blun",
        password: "bluntly55",
      },
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Username must be more than 4 characters");
});

test("Should reject if firstname or lastname contains non-alphabetic characters", async () => {
  const response = await request(app)
    .post("/accounts")
    .send({
      newAccountData: {
        firstname: "James",
        lastname: "Bl@nt",
        username: "blunt",
        password: "bluntly55",
      },
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Names can only contain alphabet");
});

test("Should reject if firstname or lastname is less than 3 characters", async () => {
  const response = await request(app)
    .post("/accounts")
    .send({
      newAccountData: {
        firstname: "Ja",
        lastname: "S",
        username: "blunt",
        password: "bluntly55",
      },
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe(
    "Firstname & lastname must be more than 2 characters"
  );
});
