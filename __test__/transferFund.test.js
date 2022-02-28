const request = require("supertest");

const app = require("../app");

test("Should transfer fund successfully", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/transfer")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      receiverAccountNumber: 2580000001,
      transferAmount: 2000,
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("Fund transfer was successful");
});

test("Should fail with transfer amount below 50.00", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/transfer")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      receiverAccountNumber: 2580000004,
      transferAmount: 49.99,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Minimum transfer amount is 50.00");
});

test("Should fail with negative transfer amount", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/transfer")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      receiverAccountNumber: 2580000004,
      transferAmount: -200,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Minimum transfer amount is 50.00");
});

test("Should fail with transfer amount above balance", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/transfer")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      receiverAccountNumber: 2580000004,
      transferAmount: 97600000,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe(
    "Your transfer request exceeds your balance"
  );
});

test("Should fail with transfer to self", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/transfer")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      receiverAccountNumber: 2580000003,
      transferAmount: 20000,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Transfer to self is not possible");
});

test("Should fail with transfer to invalid account number", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/transfer")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      receiverAccountNumber: 3580000099,
      transferAmount: 2000,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Receiver's account does not exist");
});
