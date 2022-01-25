


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
