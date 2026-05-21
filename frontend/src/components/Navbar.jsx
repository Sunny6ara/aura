import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore(state => state.cartItems);

  return (
    <nav className="fixed w-full z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-dark hover:text-accent transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-text-dark">
              AURA <span className="text-accent text-sm ml-1 font-sans font-normal tracking-normal uppercase">Jewelry</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-sm tracking-widest uppercase hover:text-accent transition-colors duration-300">Home</Link>
            <Link to="/shop" className="text-sm tracking-widest uppercase hover:text-accent transition-colors duration-300">Shop</Link>
            <Link to="/shop?category=Korean" className="text-sm tracking-widest uppercase hover:text-accent transition-colors duration-300">Korean Collection</Link>
            <Link to="/about" className="text-sm tracking-widest uppercase hover:text-accent transition-colors duration-300">Our Story</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/wishlist" className="text-text-dark hover:text-accent transition-colors hidden sm:block">
              <Heart size={20} />
            </Link>
            <Link to="/login" className="text-text-dark hover:text-accent transition-colors">
              <User size={20} />
            </Link>
            <Link to="/checkout" className="text-text-dark hover:text-accent transition-colors relative flex items-center">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-20 w-full left-0 border-t border-white/20">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base tracking-widest uppercase hover:bg-secondary/50 transition-colors">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base tracking-widest uppercase hover:bg-secondary/50 transition-colors">Shop All</Link>
            <Link to="/shop?category=Korean" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base tracking-widest uppercase hover:bg-secondary/50 transition-colors">Korean Collection</Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base tracking-widest uppercase hover:bg-secondary/50 transition-colors">Wishlist</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
