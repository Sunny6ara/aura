const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { 
    type: String, 
    required: true,
    enum: ['Earrings', 'Necklaces', 'Rings', 'Bracelets', 'Korean Jewelry', 'Handmade Jewelry']
  },
  images: [{ type: String }], // Array of image URLs
  stock: { type: Number, required: true, default: 10 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
