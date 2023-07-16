const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
  res.render('comment', {
    logged_in: req.session.logged_in
  });
});

router.post('/', (req, res) => {
  Comment.create({
    comment: req.body.comment,
    user_id: req.session.user_id,
    blog_id: req.body.blog_id
  })
  .then((comment) => res.status(200).json(comment))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((comment) => res.status(200).json(comment))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((comment) => 
    res.status(200).json(comment))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

module.exports = router;