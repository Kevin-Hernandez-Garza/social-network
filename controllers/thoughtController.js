const { Thought, User } = require('../models');

const ThoughtController = {
    // get all
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get one by id 
    getOneThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThought => {
                if(!dbThought) {
                    res.status(404).json({ message: 'There is not a thought by that id!' });
                    return;
                }

                res.json(dbThought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create 
    createThought({ params, body }, res) {
        Thought.create(body) 
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbThought => {
                if(!dbThought) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
            })
            .catch(err => res.json(err));
    },


    // update
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body, 
            { new: true }
        )
            .then(dbThought => {
                if(!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete 
    deleteThoughtById({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then(dbThought => {
            if(!dbThought) {
                res.status(404).json({ message: 'There is no thought with that id!' });
                return;
            }

            res.json();
        }) 
        .catch(err => res.status(400).json(err));
    },

    // create reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThought => {
                if(!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }

                res.json(dbThought);
            })
            .catch(err => res.json(err)); 
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThought => res.json(dbThought))
            .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;