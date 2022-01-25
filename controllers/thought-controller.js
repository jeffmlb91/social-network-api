const { Thought, User } = require ('../models');

const thoughtController = {
    //get every thought
    getAllThoughts(req, res) {
        Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
 
    //create thought 
    createThoughts({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then((dbThoughtData) => {        
                return User.findOneAndUpdate( 
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
                    .select('-__v');
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Users not found with keyed id' });
                    return;
                }
                console.log(dbUserData)
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Update every thought
    updateThoughts({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found with keyed id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    //Remove  thought  by deleting ( CRUD OPERATION )
    deleteThoughts({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found with keyed id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Create Reaction ( CRUD Operation )
    createReactions({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found with keyed id' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },
    //Remove Reaction with CURD operation from
    deleteReactions({ params }, res) {
        console.log(params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;

//TEST CODES BELOW
// const { User, Thought } = require("../models");

// const controllerForThought = {
//   // First we obtain all the thoughts

//   findAllThought(req, res) {
//     Thought.find({})
//       .then((thoughtDataDB) => res.json(thoughtDataDB))
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Then we obtain the thought by its id

//   findThoughtId({ params }, res) {
//     Thought.findOne({ _id: params.thoughtId })
//       .then((thoughtDataDB) => {
//         if (!thoughtDataDB) {
//           return res.status(404).json({ message: "Unable to find thought." });
//         }
//         res.json(thoughtDataDB);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   createThought({ params, body }, res) {
//     Thought.create(body)
//       .then(({ _id }) => {
//         return User.findOnePlusUpdate(
//           { _id: params.userId },
//           { $push: { thoughts: _id } },
//           { new: true }
//           // { _id: params.userId.push},
//           // { $push: { thoughts: _id } },
//           // { new: true }
//         );
//       })
//       .then((userDataDB) => {
//         if (!userDataDB) {
//           return res.status(404).json({ message: "Unable to find user" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => res.json(err));
//   },

//   //Create a reaction
//   createReaction({ params, body }, res) {
//     Thought.findOnePlusUpdate(
//       { _id: params.thoughtId },
//       { $push: { reactions: body } },
//       { new: true, runValidators: true }
//     )
//       .then((userDataDB) => {
//         if (!userDataDB) {
//           return res.status(404).json({ message: "Unable to find user" });
//         }
//         res.json(userDataDB);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   //Update
//   updateThought({ params, body }, res) {
//     Thought.findOnePlusUpdate({ _id: params.thoughtId }, body, {
//       new: true,
//       runValidators: true,
//     })
//       .then((thoughtDataDB) => {
//         if (!thoughtDataDB) {
//           return res
//             .status(404)
//             .json({ message: "Unable to find any thought" });
//         }
//         res.json(thoughtDataDB);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   //DeleteThought

//   deleteThought({ params }, res) {
//     Thought.findOnePlusDelete({ _id: params.thoughtId })
//       .then((deletedThought) => {
//         if (!deletedThought) {
//           res.status(404).json({ message: "Unable to find any thought" });
//           return;
//         }
//         res.json(deletedThought);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   deleteReaction({ params }, res) {
//       Thought.findOnePlusUpdate(
//           { _id: params.thoughtId }, 
//           { $pull: { reactions: {reactionId: params.reactionId }}},
//           { new: true }
//       )
//       .then(thoughtDataDB => res.json(thoughtDataDB))
//       .catch(err => res.status(500).json(err));
//   }
// };

// module.exports = controllerForThought;
