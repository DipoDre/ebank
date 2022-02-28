const request = require("supertest");

const app = require("../app");

test("Should not allow access with no token", async () => {
  const response = await request(app)
    .patch("/accounts/2580000005/deposit")
    .send({
      depositAmount: 4500,
    });

  expect(response.statusCode).toBe(403);
  expect(response.body.message).toBe("No token provided!");
});

test("Should not allow access with invalid token", async () => {
  const response = await request(app)
    .patch("/accounts/2580000005/deposit")
    .set({
      "x-access-token":
        "ffffffffffRRRRRRRRRRInR5cCI6IkpXVCJ9.ddddddddddFtZSI6ImxhcnJ5ZyIsImlhdCI6MTY0NjAwNDI2OX0.AAAAAAAAAAp05FWSqR6WoWO04HoiNVjqynEMzQo46IuI_c",
    })
    .send({
      depositAmount: 4500,
    });

  expect(response.statusCode).toBe(403);
  expect(response.body.message).toBe("Kindly create an account");
});

test("Should not authorize access to other users' accounts", async () => {
  const response = await request(app)
    .patch("/accounts/2580000005/deposit")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhcnJ5ZyIsImlhdCI6MTY0NjAwNDI2OX0.SOgxTqMp05FWSqR6WoWO04HoiNVjqynEMzQo46IuI_c",
    })
    .send({
      depositAmount: 4500,
    });

  expect(response.statusCode).toBe(403);
  expect(response.body.message).toBe(
    "You are not authorized to access this account"
  );
});
