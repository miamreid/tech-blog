const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

const sequelize = require('../config/connection');

router.get('/', withAuth, (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id,
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
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('dashboard', { blogs, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findByPk(req.params.id, {
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
        if (dbBlogData) {
            const blog = dbBlogData.get({ plain: true });

            res.render('editBlog', {
                blog,
                loggedIn: true,
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;