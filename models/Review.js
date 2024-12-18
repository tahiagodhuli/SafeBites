const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  restaurantId: { type: Number, required: true },
  restaurantName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
