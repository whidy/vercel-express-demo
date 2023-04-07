const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
const handlecreate = (req, res) => {};

// Retrieve all Tutorials from the database.
const handlefindAll = async (req, res) => {
  const result = await Tutorial.findAll();
  return result;
};

// Find a single Tutorial with an id
const handlefindOne = (req, res) => {};

// Update a Tutorial by the id in the request
const handleupdate = (req, res) => {};

// Delete a Tutorial with the specified id in the request
const handledelete = (req, res) => {};

// Delete all Tutorials from the database.
const handledeleteAll = (req, res) => {};

// Find all published Tutorials
const handlefindAllPublished = (req, res) => {};

export default {
  handlecreate,
  handlefindAll,
  handlefindOne,
  handleupdate,
  handledelete,
  handledeleteAll,
  handlefindAllPublished,
};
