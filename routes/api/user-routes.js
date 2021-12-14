const router = require('express').Router();
const {
    getAllUsers, 
    getUserById,
    createUser, 
    updateUser,
    deleteUserById,
    addNewFriend, 
    deleteFriend
} = require('../../controllers/userController');

// api/users
router 
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:id
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(deleteFriend)    


module.exports = router;