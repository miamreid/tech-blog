const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  Blog.findAll({
    attributes: ['id', 'title', 'content', 'date_created'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
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
    attributes: ['id', 'title', 'content', 'date_created'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
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

    res.render('single-post', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
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
