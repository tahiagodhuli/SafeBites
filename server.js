require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");
const User = require('./models/User');
const app = express();
const Review = require('./models/Review');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files like HTML

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a review
app.post('/api/reviews', async (req, res) => {
  const { restaurantId, restaurantName, userId, username, rating, review } = req.body;

  if (!restaurantId || !rating || !review || !userId || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = new Review({ restaurantId, restaurantName, userId, username, rating, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error saving review:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get reviews for a restaurant
app.get('/api/reviews/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const reviews = await Review.find({ restaurantId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));