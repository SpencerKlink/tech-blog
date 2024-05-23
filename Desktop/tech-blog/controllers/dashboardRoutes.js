const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { userId: req.session.userId },
            include: [
                {
                    model: Comment,
                    include: {
                        model: User
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const posts = userPosts.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', (req, res) => {
    res.send('Response from route');
  });
  

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { loggedIn: true });
});


module.exports = router;
