import express from "express";
import { check, validationResult } from "express-validator";
import Permission from "../models/Permission.js"; // Import the Permission model

const router = express.Router();

// POST /api/permissions - Create a new permission
router.post(
  "/",
  [
    check("name", "Permission name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, description } = req.body;

    try {
      // Check for duplicate permission
      const existingPermission = await Permission.findOne({ name });
      if (existingPermission) {
        return res
          .status(400)
          .json({ msg: "Permission with this name already exists" });
      }

      const newPermission = new Permission({ name, category, description });
      await newPermission.save();

      res.status(201).json({
        msg: "Permission created successfully",
        permission: newPermission,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// GET /api/permissions - Fetch all permissions
router.get("/", async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/permissions/:id - Fetch a permission by ID
router.get("/:id", async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ msg: "Permission not found" });
    }

    res.status(200).json(permission);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/permissions/:id - Update a permission by ID
router.put(
  "/:id",
  [
    check("name", "Permission name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, description } = req.body;

    try {
      const permission = await Permission.findById(req.params.id);

      if (!permission) {
        return res.status(404).json({ msg: "Permission not found" });
      }

      // Update the permission
      permission.name = name;
      permission.category = category;
      permission.description = description;

      await permission.save();

      res.status(200).json({
        msg: "Permission updated successfully",
        permission,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// DELETE /api/permissions/:id - Delete a permission by ID
router.delete("/:id", async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ msg: "Permission not found" });
    }

    await permission.remove();
    res.status(200).json({ msg: "Permission deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
