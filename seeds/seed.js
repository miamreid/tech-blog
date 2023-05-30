const userData = require('./userData');
const blogData = require('./blogData');
const commentData = require('./commentData');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n------ DATABASE SYNCED ------\n');

  await userData();
  console.log('\n------ USERS SEEDED ------\n');
  
  await blogData();
  console.log('\n------ BLOGS SYNCED ------\n');

  await commentData();
  console.log('\n------ COMMENTS SYNCED ------\n');

  process.exit(0);
};

seedDatabase();
