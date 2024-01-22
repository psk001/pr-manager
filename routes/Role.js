const express = require("express");
const router = express.Router();
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} = require("../controllers/Role");

// Create a new role
router.post("/", createRole);

// Get all roles
router.get("/", getAllRoles);

// Get a specific role by ID
router.get("/:id", getRoleById);

// Update a role by ID
router.put("/:id", updateRoleById);

// Delete a role by ID
router.delete("/:id", deleteRoleById);

module.exports = router;
