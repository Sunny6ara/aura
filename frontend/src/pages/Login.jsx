import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    if (formData.email && formData.password) {
      // Dummy admin login
      if(formData.email === 'admin@aura.com') {
         login({ _id: 'admin123', name: 'Admin', email: formData.email, role: 'admin', token: 'dummy_token' });
         toast.success('Welcome Admin');
         navigate('/admin');
         return;
      }

      login({ _id: '1', name: formData.name || 'Aura Guest', email: formData.email, role: 'user', token: 'dummy_token' });
      toast.success(isLogin ? 'Logged in successfully' : 'Account created successfully');
      navigate(redirect);
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-primary px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 md:p-14 luxury-shadow w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-text-light text-sm">
            {isLogin ? 'Sign in to access your wishlist and exclusive offers.' : 'Join Aura to discover premium jewelry.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full border-b border-text-dark/20 py-3 focus:outline-none focus:border-accent bg-transparent transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full border-b border-text-dark/20 py-3 focus:outline-none focus:border-accent bg-transparent transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full border-b border-text-dark/20 py-3 focus:outline-none focus:border-accent bg-transparent transition-colors"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <span className="text-xs text-text-light hover:text-accent cursor-pointer transition-colors">Forgot Password?</span>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-text-dark text-white uppercase tracking-widest text-sm py-4 mt-4 hover:bg-accent transition-colors duration-300"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-light">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-text-dark hover:text-accent border-b border-text-dark hover:border-accent transition-colors pb-0.5"
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
