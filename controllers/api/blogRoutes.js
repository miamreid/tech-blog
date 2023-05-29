const router = require('express').Router();
const { Blog} = require('../../models');
const withAuth = require('../../utils/auth');
const { post } = require('../homeRoutes');

router.post('/', withAuth, async (req, res) => {
  Blog.create({
    title: req.body.title,
    content: req.body.conte,
    user_id: req.session.user_id
  })
  .then(dbBlogData => res.json(dbBlogData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/', (req, res) => {
  Blog.findAll({
    attributes: [
      'id', 'content', 'title', 'date_created',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbBlogData => res.json(dbBlogData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 'content', 'title', 'date_created',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
  .then(dbBlogData => res.json(dbBlogData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', withAuth, (req, res) => {
  Blog.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, async (req, res) => {
  console.log('id', req.params.id);
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;