import express from "express";
import { check, validationResult } from "express-validator";
import Role from "../models/role.js"; // Import Role model
import AdminUser from "../models/User.js"; // Import User model

const router = express.Router();

// POST /api/roles - Create a new role
router.post(
  "/",
  [
    check("name", "Role name is required").not().isEmpty(),
    check("permissions", "Permissions must be an array").isArray(),
  ],
  async (req, res) => {
    console.log("Request received:", req.body); // Log request payload

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, permissions } = req.body;

    try {
      let existingRole = await Role.findOne({ name });
      if (existingRole) {
        console.log("Role already exists");
        return res.status(400).json({ msg: "Role with this name already exists" });
      }

      const newRole = new Role({ name, permissions });
      await newRole.save();
      console.log("Role saved:", newRole); // Log saved role
      res.status(201).json({ msg: "Role created successfully", role: newRole });
    } catch (err) {
      console.error("Error in saving role:", err.message); // Log server error
      res.status(500).json({ msg: "Server error" });
    }
  }
);


// GET /api/roles - Fetch all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/roles/:id - Delete a role by ID
router.delete("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ msg: "Role not found" });
    }

    await role.remove();
    res.status(200).json({ msg: "Role deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/roles/assign - Assign a role to a user
router.post(
  "/assign",
  [
    check("userId", "User ID is required").not().isEmpty(),
    check("roleId", "Role ID is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, roleId } = req.body;

    try {
      const user = await AdminUser.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({ msg: "Role not found" });
      }

      user.role = roleId; // Assuming `role` is a field in the User schema
      await user.save();

      res.status(200).json({ msg: "Role assigned successfully", user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
