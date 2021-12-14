const { User } = require('../models');

const UserController = {
    // get all 
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'There is no user with this id!' })
                    return;
                }

                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create user
    createUser({ body}, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    // update user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            body, 
            { new: true, runValidators: true }
        )
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user by id
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser =>  {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(400).json(err));
    },

    // add new friends
    addNewFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true }
        )
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'There is no user found with this id!' });
                    return;
                }

                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete friends
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true }
        )
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No friend found with this id!'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = UserController;