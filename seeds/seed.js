const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const sequelize = require('../config/connection');

const { User, Blog, Comment } = require('../models');

const seedDatabase = async () => {
  await User.bulkCreate(userData, {individualHooks: true,});
  console.log('\n------ USERS SEEDED ------\n');
  
  await Blog.bulkCreate(blogData);
  console.log('\n------ BLOGS SYNCED ------\n');

  await Comment.bulkCreate(commentData);
  console.log('\n------ COMMENTS SYNCED ------\n');

  process.exit(0);
};

sequelize.sync({ force: true }).then(() => {
  seedDatabase();
});
console.log('\n------ DATABASE SYNCED ------\n');

