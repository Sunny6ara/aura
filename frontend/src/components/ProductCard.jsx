import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary/20 mb-4 luxury-shadow">
          <img 
            src={product.images[0] || 'https://via.placeholder.com/400x500'} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isTrending && (
              <span className="bg-white/90 backdrop-blur-sm text-text-dark text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Trending
              </span>
            )}
            {product.originalPrice > product.price && (
              <span className="bg-accent/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Sale
              </span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button className="bg-white p-3 rounded-full hover:bg-accent hover:text-white transition-colors duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0">
              <Heart size={20} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-white p-3 rounded-full hover:bg-text-dark hover:text-white transition-colors duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0 delay-75"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-text-light mb-1 uppercase tracking-widest">{product.category}</p>
          <h3 className="font-serif text-lg text-text-dark mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
          <div className="flex justify-center items-center gap-3">
            <span className="text-text-dark font-medium">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-text-light line-through text-sm">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
