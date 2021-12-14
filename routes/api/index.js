// importing module
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');


// prefix the routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


// exporting
module.exports = router;