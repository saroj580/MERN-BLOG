import express from "express";
import { test, updateUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import User from "../model/user.model.js";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.put("/update-profile", async (req, res) => {
  const { userId, profilePicture } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});


export default router;