import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, removeFromCart } = useCartStore();
  const { user } = useAuthStore();
  const [address, setAddress] = useState({
    street: '', city: '', state: '', pincode: '', phone: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Simulate Razorpay integration
    toast.loading('Initializing payment...', { duration: 1500 });
    
    setTimeout(() => {
      const options = {
        key: "YOUR_RAZORPAY_KEY", 
        amount: total * 100, 
        currency: "INR",
        name: "AURA Jewelry",
        description: "Luxury Jewelry Purchase",
        image: "https://via.placeholder.com/150",
        handler: function (response) {
          toast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`);
          // Send payment result to backend here
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: address.phone
        },
        theme: {
          color: "#d4af37"
        }
      };
      
      // Since this is a dev environment without the Razorpay script loaded globally, 
      // we'll just simulate a successful payment alert for now if Razorpay is not defined.
      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.success('Test Payment Successful! (Razorpay script not found)');
      }
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif mb-10 text-center">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Details */}
        <div className="lg:w-2/3 space-y-10">
          
          <div className="bg-white p-6 md:p-8 luxury-shadow rounded-sm">
            <h2 className="text-xl font-serif mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm text-text-light mb-2">Street Address</label>
                <input type="text" className="w-full border-b border-text-dark/20 py-2 focus:outline-none focus:border-accent" onChange={e => setAddress({...address, street: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-text-light mb-2">City</label>
                <input type="text" className="w-full border-b border-text-dark/20 py-2 focus:outline-none focus:border-accent" onChange={e => setAddress({...address, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-text-light mb-2">State</label>
                <input type="text" className="w-full border-b border-text-dark/20 py-2 focus:outline-none focus:border-accent" onChange={e => setAddress({...address, state: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-text-light mb-2">Pincode</label>
                <input type="text" className="w-full border-b border-text-dark/20 py-2 focus:outline-none focus:border-accent" onChange={e => setAddress({...address, pincode: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-text-light mb-2">Phone</label>
                <input type="text" className="w-full border-b border-text-dark/20 py-2 focus:outline-none focus:border-accent" onChange={e => setAddress({...address, phone: e.target.value})} />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-secondary/10 p-6 md:p-8 border border-secondary sticky top-28">
            <h2 className="text-xl font-serif mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar">
              {cartItems.length === 0 ? (
                <p className="text-text-light text-sm">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-dark line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-text-light mt-1">Qty: {item.qty}</p>
                      <p className="text-sm font-medium mt-1">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-text-light hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-text-dark/10 text-sm">
              <div className="flex justify-between">
                <span className="text-text-light">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-serif text-lg pt-4 border-t border-text-dark/10">
                <span>Total</span>
                <span className="text-accent">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={cartItems.length === 0}
              className="w-full bg-text-dark text-white uppercase tracking-widest text-sm py-4 mt-8 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay Now (Razorpay)
            </button>
            
            {!user && (
              <p className="text-xs text-center text-text-light mt-4">
                <Link to="/login" className="underline hover:text-accent">Login</Link> to complete your purchase.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
