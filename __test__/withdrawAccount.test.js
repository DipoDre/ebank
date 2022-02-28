const request = require("supertest");

const app = require("../app");

test("Should withdraw fund successfully", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/withdraw")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      withdrawAmount: 3000,
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("Fund withdraw was successful");
});

test("Should fail with withdraw amount below 100.00", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/withdraw")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      withdrawAmount: 99.99,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Minimum withdraw amount is 100.00");
});

test("Should fail with negative withdraw amount", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/withdraw")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      withdrawAmount: -200,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Minimum withdraw amount is 100.00");
});

test("Should fail for withdraw amount that exceeds balance", async () => {
  const response = await request(app)
    .patch("/accounts/2580000003/withdraw")
    .set({
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g ",
    })
    .send({
      withdrawAmount: 97600000,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe(
    "Your withdrawal request exceeds your balance"
  );
});
