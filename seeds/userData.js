const { User, Blog } = require('../models');
const sequelize = require('../config/connection');

const dbUserData =
[
    {
      id: 1,
      username: "Sal",
      email: "sal@hotmail.com",
      password: "password12345"
    },
    {
      id: 2,
      username: "Lernantino",
      email: "lernantino@gmail.com",
      password: "password12345"
    },
    {
      id: 3,
      username: "Amiko",
      email: "amiko2k20@aol.com",
      password: "password12345"
    }
  ];

const seedUsers = () => User.bulkCreate(dbUserData, {individualHooks: true});

module.exports = seedUsers;
  