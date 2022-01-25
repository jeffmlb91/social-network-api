const { User } = require("../models");
const userController = {
  // --> REQUEST DATA
  getAllUser(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //Obtain one user at the time
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // create a User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  //Update the user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //Delete the user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //Add friend on the user list
  addFriend({ params }, res) {
    User.findOne({ _id: params.userId }).then((user) => {
      if (user.friends.includes(params.friendId)) {
        res.status(500).send("Users are already friends.");
      }
    });

    User.findOneAndUpdate(
      { _id: params.userId },
      {
        $push: {
          friends: params.friendId,
        },
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //Remove the friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID. " });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
module.exports = userController;
