const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
  res.render('comments', {
    loggedIn: req.session.loggedIn
  });
});

router.post('/', (req, res) => {
  user_id: req.session.user_id,
  Comment.create({
    user_id: user_id,
    cont: req.body.cont,
    blog_id: req.body.blog_id
  })
  .then(dbCommentData => res.status(dbCommentData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then(dbCommentData => 
      res.status(200).json(dbCommentData))
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

module.exports = router;
