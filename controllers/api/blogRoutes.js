const router = require('express').Router();
const { Blog, Comment } = require('../../models');

router.get('/', async (req, res) => {
  Blog.findAll({
    include: [
      {
        model: Comment
      }
    ],
  })
  .then((blogs) => res.json(blogs))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.post('/', (req, res) => {
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
  .then((blog) => res.status(200).json(blog))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});



router.put('/:id', (req, res) => {
  Blog.update(req.body,
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((blog) => res.status(200).json(blog))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((blogs) => 
      res.status(200).json(blogs))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

module.exports = router;