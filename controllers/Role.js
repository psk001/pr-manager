// controllers/roleController.js

const Role = require("../models/Role");

// Create a new role
const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    // Check if the role already exists
    const existingRole = await Role.findOne({ roleName });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists." });
    }

    const role = new Role({ roleName });
    const savedRole = await role.save();

    res.status(201).json(savedRole);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a role by ID
const updateRoleById = async (req, res) => {
  try {
    const { roleName } = req.body;

    // Check if the role exists
    const existingRole = await Role.findById(req.params.id);
    if (!existingRole) {
      return res.status(404).json({ message: "Role not found." });
    }

    existingRole.roleName = roleName;
    const updatedRole = await existingRole.save();

    res.json(updatedRole);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a role by ID
const deleteRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    await role.remove();
    res.json({ message: "Role deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
