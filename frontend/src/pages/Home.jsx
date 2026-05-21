import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Dummy data for now
  const featuredProducts = [
    { _id: '1', name: 'Lumina Pearl Drop Earrings', price: 2499, originalPrice: 3200, category: 'Earrings', isTrending: true, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'] },
    { _id: '2', name: 'Seoul Minimalist Choker', price: 1899, category: 'Korean Jewelry', images: ['https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?q=80&w=600&auto=format&fit=crop'] },
    { _id: '3', name: 'Eternity Diamond Ring', price: 5999, category: 'Rings', images: ['https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=600&auto=format&fit=crop'] },
    { _id: '4', name: 'Aura Signature Bracelet', price: 3499, originalPrice: 4000, category: 'Bracelets', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop'] },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Jewelry Banner" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-primary/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="block text-white/90 text-sm tracking-[0.3em] uppercase mb-4"
          >
            The New Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
          >
            Elegance <br/><span className="text-accent/90 italic">Redefined</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto"
          >
            Discover our curated selection of premium handcrafted jewelry designed for the modern muse.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/shop" className="inline-block bg-white text-text-dark px-10 py-4 text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-300 luxury-shadow">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Shop by Category</h2>
            <div className="w-16 h-[1px] bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Earrings', 'Necklaces', 'Korean Jewelry'].map((cat, idx) => (
              <motion.div 
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative h-96 overflow-hidden rounded-xl"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${idx === 0 ? '1535632066927-ab7c9ab60908' : idx === 1 ? '1599643478524-fb66f70a00ea' : '1611591437281-460bfbe1220a'}?q=80&w=600&auto=format&fit=crop`}
                  alt={cat} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link to={`/shop?category=${cat}`} className="bg-white/90 backdrop-blur-sm px-8 py-3 text-sm tracking-widest uppercase text-text-dark hover:bg-accent hover:text-white transition-colors duration-300">
                    {cat}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Trending Now</h2>
              <div className="w-16 h-[1px] bg-accent"></div>
            </div>
            <Link to="/shop" className="hidden md:block text-sm tracking-widest uppercase hover:text-accent transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
