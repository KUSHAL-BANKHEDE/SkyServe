const User = require('./models/User'); // User schema
const File = require('./models/File'); // File schema

exports. register = async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
exports. retain = async (req, res) => {
    try {
      const files = await File.find({ userId: req.params.userId });
      res.status(200).json(files);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };