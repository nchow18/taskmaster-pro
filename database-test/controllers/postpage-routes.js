const router = require('express').Router();
const { Post, User }  = require('../models');
const sequelize = require('../config/connection');

// get all POSTS
router.get('/', (req, res) => {
    console.log('=====================');
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'post',
            'title',
            'topic',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(posts => posts.get({ plain: true }))
        res.render('posts', { posts })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;