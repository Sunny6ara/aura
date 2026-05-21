import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  // Dummy product
  const product = { 
    _id: id, 
    name: 'Lumina Pearl Drop Earrings', 
    price: 2499, 
    originalPrice: 3200, 
    description: 'Crafted with meticulous attention to detail, the Lumina Pearl Drop Earrings feature freshwater cultured pearls suspended from an 18k gold-plated sterling silver huggie hoop. Perfect for elevating your everyday look or adding the finishing touch to your evening attire.',
    category: 'Earrings', 
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632787350-cb9ec9a95cbc?q=80&w=800&auto=format&fit=crop'
    ],
    details: ['18k Gold Plated Sterling Silver', 'Freshwater Cultured Pearls', 'Hypoallergenic', 'Handcrafted']
  };

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    toast.success('Added to your cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Images */}
        <div className="lg:w-1/2 flex gap-4 h-[600px]">
          <div className="hidden sm:flex flex-col gap-4 w-24 overflow-y-auto no-scrollbar">
            {product.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Thumbnail ${idx}`} className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity" />
            ))}
          </div>
          <div className="flex-1 bg-secondary/20 relative overflow-hidden">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <p className="text-text-light text-sm tracking-widest uppercase mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-serif mb-4 text-text-dark">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
            </div>
            <span className="text-sm text-text-light underline cursor-pointer">42 Reviews</span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-2xl font-medium text-text-dark">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-text-light line-through mb-1">₹{product.originalPrice}</span>
            )}
          </div>

          <p className="text-text-light mb-8 leading-relaxed font-light">
            {product.description}
          </p>

          <div className="space-y-3 mb-10">
            {product.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-text-dark">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                {detail}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-10">
            <div className="border border-text-dark/20 flex items-center px-4 rounded-none">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-text-light hover:text-text-dark">-</button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 text-text-light hover:text-text-dark">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-text-dark text-white uppercase tracking-widest text-sm hover:bg-accent transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-secondary">
            <div className="flex flex-col items-center text-center gap-2 text-sm text-text-light">
              <Truck size={24} className="text-text-dark" />
              <span>Free Express Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 text-sm text-text-light">
              <Shield size={24} className="text-text-dark" />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 text-sm text-text-light">
              <RotateCcw size={24} className="text-text-dark" />
              <span>14-Day Returns</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
