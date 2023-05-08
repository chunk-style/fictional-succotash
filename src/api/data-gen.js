"use strict";

const fs = require("fs");
const { faker } = require("@faker-js/faker");

const db = {
  users: [],
  notifications: [],
};

for (let i = 1; i <= 10; i++) {
  const first = faker.name.firstName();
  const last = faker.name.lastName();
  const email = faker.internet.email(first, last);

  db.users.push({
    id: i,
    name: `${first} ${last}`,
    email: email,
    lastLogin: faker.date.recent(60),
  });
}

for (let i = 1; i <= 100; i++) {
  const userId = faker.random.numeric();

  db.notifications.push({
    id: i,
    userId,
    subject: faker.music.songName(),
    message: faker.hacker.phrase(),
    timestamp: faker.date.recent(60),
  });
}

fs.writeFileSync("db.json", JSON.stringify(db));
