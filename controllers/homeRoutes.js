const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
  const dbBlogData = await Blog.findAll({
    include: [
      {
        model: Comment
       },
      {
        model: User,
        attributes: { exclude: ['password'] }},
      ]
    });
    
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password']
          }
        }
      ]
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', withAuth, async (req, res) => {
  try {
  const dbBlogData = await Blog.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: {
            exclude: ['password']
        }
      }
    }
  ]
});
  const blog = dbBlogData.get({ plain: true});

    res.render('blog', {
      ...blog,
      loggedIn: req.session.loggedIn,
    });
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;