import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-secondary mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-text-dark block mb-6">
              AURA
            </Link>
            <p className="text-text-light text-sm mb-6 leading-relaxed">
              Curated luxury jewelry for the modern woman. Discover our handpicked collection of premium accessories designed to elevate your everyday style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-light hover:text-accent transition-colors text-sm font-semibold">IG</a>
              <a href="#" className="text-text-light hover:text-accent transition-colors text-sm font-semibold">FB</a>
              <a href="#" className="text-text-light hover:text-accent transition-colors text-sm font-semibold">X</a>
              <a href="#" className="text-text-light hover:text-accent transition-colors text-sm font-semibold">YT</a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Earrings" className="text-text-light hover:text-accent transition-colors text-sm">Earrings</Link></li>
              <li><Link to="/shop?category=Necklaces" className="text-text-light hover:text-accent transition-colors text-sm">Necklaces</Link></li>
              <li><Link to="/shop?category=Rings" className="text-text-light hover:text-accent transition-colors text-sm">Rings</Link></li>
              <li><Link to="/shop?category=Korean Jewelry" className="text-text-light hover:text-accent transition-colors text-sm">Korean Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Customer Care</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-text-light hover:text-accent transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="#" className="text-text-light hover:text-accent transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link to="#" className="text-text-light hover:text-accent transition-colors text-sm">Ring Sizer</Link></li>
              <li><Link to="#" className="text-text-light hover:text-accent transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Join The Club</h4>
            <p className="text-text-light text-sm mb-4">Subscribe for exclusive offers, new drops, and styling tips.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-3 bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:border-accent text-sm"
              />
              <button 
                type="button" 
                className="w-full bg-text-dark text-white px-4 py-3 rounded-md text-sm tracking-widest uppercase hover:bg-accent transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-secondary mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-light text-xs text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AURA Jewelry. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-text-light">
            <Link to="#" className="hover:text-accent">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
