const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

//GET & POST  /api/userSchema

router.route("/").get(getAllUser).post(createUser);

//Get DELETE and Update userSchema

router.route("/:id").put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;