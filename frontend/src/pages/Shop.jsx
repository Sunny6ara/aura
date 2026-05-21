import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = ['All', 'Earrings', 'Necklaces', 'Rings', 'Bracelets', 'Korean Jewelry'];

  // Dummy products
  const allProducts = [
    { _id: '1', name: 'Lumina Pearl Drop Earrings', price: 2499, category: 'Earrings', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'] },
    { _id: '2', name: 'Seoul Minimalist Choker', price: 1899, category: 'Korean Jewelry', images: ['https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?q=80&w=600&auto=format&fit=crop'] },
    { _id: '3', name: 'Eternity Diamond Ring', price: 5999, category: 'Rings', images: ['https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=600&auto=format&fit=crop'] },
    { _id: '4', name: 'Aura Signature Bracelet', price: 3499, category: 'Bracelets', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop'] },
    { _id: '5', name: 'Vintage Gold Hoops', price: 1299, category: 'Earrings', images: ['https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=600&auto=format&fit=crop'] },
    { _id: '6', name: 'Rose Gold Pendant', price: 2899, category: 'Necklaces', images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop'] },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">The Collection</h1>
        <p className="text-text-light max-w-2xl mx-auto font-light">
          Explore our complete range of finely crafted jewelry. Each piece tells a story of elegance and timeless beauty.
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-secondary pb-6">
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto w-full md:w-auto space-x-8 no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
              className={`text-sm tracking-widest uppercase whitespace-nowrap transition-colors duration-300 relative ${
                activeCategory === cat ? 'text-accent' : 'text-text-light hover:text-text-dark'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeCategory" 
                  className="absolute -bottom-3 left-0 right-0 h-[2px] bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 cursor-pointer w-full md:w-auto justify-end">
          <span className="text-sm text-text-light uppercase tracking-widest">Sort by</span>
          <div className="flex items-center gap-1 font-medium text-sm">
            Featured <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-light text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
