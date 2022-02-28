const request = require("supertest");

const app = require("../app");

test("Should fund account successfully", async () => {
  const response = await request(app)
    .patch("/accounts/2580000001/deposit")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhcnJ5ZyIsImlhdCI6MTY0NjAwNDI2OX0.SOgxTqMp05FWSqR6WoWO04HoiNVjqynEMzQo46IuI_c ",
    })
    .send({
      depositAmount: 4500,
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("The account was funded successfully");
});

test("Should fail with deposit amount below 100.00", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/deposit")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g",
    })
    .send({
      depositAmount: 99.99,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Minimum deposit amount is 100.00");
});

test("Should fail with negative deposit amount", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/deposit")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g",
    })
    .send({
      depositAmount: -200,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Minimum deposit amount is 100.00");
});

test("Should not allow deposit to make balance exceed 100 million", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/deposit")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g",
    })
    .send({
      depositAmount: 97600000,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe(
    "Your account balance can not exceed 100 Million"
  );
});
