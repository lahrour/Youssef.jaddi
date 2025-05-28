const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  User.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]); // Return first (and should be only) result
  });
};

exports.createUser = (req, res) => {
  const { name, email, age, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  User.create({ name, email, age, phone }, function(err, result) {
    if (err) return res.status(500).json({ error: err.message });
    // Get the inserted ID from the result
    const insertId = result.insertId;
    // Return the complete user object with ID
    res.json({
      id: insertId,
      name,
      email,
      age,
      phone
    });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, age, phone } = req.body;
  
  // Add validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  User.update(id, { name, email, age, phone }, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: err.message });
    }
    
    // Return the updated data directly
    res.json({ 
      id: id,
      name: name,
      email: email,
      age: age,
      phone: phone
    });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  // First check if user exists
  User.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // If user exists, proceed with deletion
    User.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User deleted successfully' });
    });
  });
};