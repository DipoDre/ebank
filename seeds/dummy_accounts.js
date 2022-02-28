/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("accounts").del();
  await knex("accounts").insert([
    {
      firstname: "Tunde",
      lastname: "James",
      username: "tjames",
      password: "$2b$10$G294OgCZ2qomb913vqDJxO/ZtgqiKuAKlJxqHJqCwjrJtT/2u1Yty",
      balance: 50000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRqYW1lcyIsImlhdCI6MTY0NjAwNDI2OX0.uYw7aX2gLhubxi4Oxn8PtoMJzrOJ1zUkr8p5GX5frSg",
    },
    {
      firstname: "Laary",
      lastname: "Gaagaa",
      username: "larryg",
      password: "$2b$10$nhCpDNjGIEJR6ENly7EkyeUmC0H3a9pZr1cKW/bnuYNKEAzFRUoG.",
      balance: 15000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhcnJ5ZyIsImlhdCI6MTY0NjAwNDI2OX0.SOgxTqMp05FWSqR6WoWO04HoiNVjqynEMzQo46IuI_c",
    },
    {
      firstname: "Yemi",
      lastname: "Alade",
      username: "aladey",
      password: "$2b$10$rJEFBT75jVlY.k9bDRTUgegktivntFHrUpkeGrqqZG7TuqlJDy6nK",
      balance: 576000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYWRleSIsImlhdCI6MTY0NjAwNDI2OX0.ncL5HDUiF55f9kUetM-ufG6S259Ej0cSOeas8ybt4hc",
    },
    {
      firstname: "Tiwa",
      lastname: "Savage",
      username: "teebaby",
      password: "$2b$10$7xfgyy406.zvS/gtZLHOUeSikhfJA1kySLbMc5KxuWRaOh2odUyH.",
      balance: 3000000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZWJhYnkiLCJpYXQiOjE2NDYwMDQyNjl9.IQNM9H8TEcjdQO_FkL2PsjQLqxXvc-YAdHFa3gTBG3g",
    },
    {
      firstname: "Damini",
      lastname: "Ogulu",
      username: "burnaboy",
      password: "$2b$10$xm1BmXJqxqX7312QF.HNxe5W/m0t59mbixzK5wxmATSdSaeuxEpK.",
      balance: 445000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1cm5hYm95IiwiaWF0IjoxNjQ2MDA0MjY5fQ.6RyrLRJfM4YJnIzqwll8GoC7yrZP6K79mHHxyuuiiAE",
    },
    {
      firstname: "Maduka",
      lastname: "Okoye",
      username: "emilio",
      password: "$2b$10$ZqsYDTaNKZ4n3AZOzVADx.24wzXMdBBIFiEBysFGlQKR.Mn2YUJTC",
      balance: 70000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxpbyIsImlhdCI6MTY0NjAwNDI2OX0.83Qu9IV7KJXeVjIiMjyATtg79l6ZHRmgtDCFFkbpx0w",
    },
    {
      firstname: "Bola",
      lastname: "Tinubu",
      username: "jagaban",
      password:
        "$2b$10$gtr / KwfeP3AYGHhMPlt87.MdDGQTnmUT4lRR91SYP6x3FHDSsoLZ6;",
      balance: 77000.0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphZ2FiYW4iLCJpYXQiOjE2NDYwMDQyNjl9.NvOeKGdw3OPgfuh2fF6NZyjwZYg5eeOXvBdVsFEPy5Y",
    },
  ]);
};
