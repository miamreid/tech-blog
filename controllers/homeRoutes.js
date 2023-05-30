const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  Blog.findAll({
    attributes: ['id', 'title', 'content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
  .then(dbBlogData => {
    const blogs = dbBlogData.map(blog => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/blog/:id', async (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
  .then(dbBlogData => {
    if(!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    const blog = dbBlogData.get({ plain: true});

    res.render('blog', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
