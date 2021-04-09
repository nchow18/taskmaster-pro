const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
// const topicRoutes = require('./topic-routes');
// const gameRoutes = require('./game-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// router.use('/topics', topicRoutes);
// router.use('/games', gameRoutes);
router.use('/comments', commentRoutes);

module.exports = router;