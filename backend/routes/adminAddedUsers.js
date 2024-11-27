import express from "express";
import { check, validationResult } from "express-validator";
import AdminAddedUser from "../models/AdminAddedUsers.js"; // Ensure the path is correct

const router = express.Router();

// POST /api/users
router.post(
  "/",
  [
    check("fullName", "Full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("role", "Role is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, role } = req.body;

    try {
      // Check if the user already exists
      let existingUser = await AdminAddedUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "User with this email already exists" });
      }

      // Create a new admin-added user
      const newUser = new AdminAddedUser({
        fullName,
        email,
        role,
      });

      await newUser.save();
      res.status(201).json({ msg: "User added successfully", user: newUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await AdminAddedUser.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/admin-added-users/:id
router.delete("/:id", async (req, res) => {
  try {
    const user = await AdminAddedUser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
