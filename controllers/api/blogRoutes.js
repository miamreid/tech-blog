const router = require('express').Router();
const { Blog, Comment } = require('../../models');

router.post('/', (req, res) => {
  user_id = req.session.user_id;
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    used_id: user_id
  })
  .then((dbBlogData) => res.status(200).json(dbBlogData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/', async (req, res) => {
  Blog.findAll({
    include: [
      {
        model: Comment
      }],
  })
  .then((dbBlogData) => res.json(dbBlogData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  Blog.update(
    req.body, {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((dbBlogData) =>
      res.status(200).json(dbBlogData))
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
  .then((dbBlogData) => 
    res.status(200).json(dbBlogData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

module.exports = router;