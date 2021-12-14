const router = require('express').Router();

// import statements
const {
    getAllThoughts,
    getThoughtById, 
    createThought, 
    updateThoughtById, 
    deleteThoughtById, 
    createReaction, 
    deleteReaction
} = require('../../controllers/thoughtController');

// set up GET all routes /api/thoughts/
router 
    .route('/')
    .get(getAllThoughts);

// set up POST routes /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought);

// set up GET one, PUT, and DELETE request /api/thoughts/:id
router  
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById)

//  POST /api/thoughts/:thoughtId/reactions
router 
    .route('/:thoughtId/reactions')
    .post(createReaction);

// DELETE /api/thoughts/:thoughtsId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// exporting module
module.exports = router;