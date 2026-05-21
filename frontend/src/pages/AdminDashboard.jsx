import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { label: 'Total Revenue', value: '₹4,25,000', icon: DollarSign },
    { label: 'Total Orders', value: '156', icon: Package },
    { label: 'Active Customers', value: '2,403', icon: Users },
    { label: 'Conversion Rate', value: '3.2%', icon: Activity },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm tracking-widest uppercase border border-text-dark px-6 py-2 hover:bg-text-dark hover:text-white transition-colors">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 luxury-shadow border-t-2 border-accent">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary/30 rounded-full text-accent">
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-serif mb-1">{stat.value}</h3>
              <p className="text-sm text-text-light uppercase tracking-widest">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 luxury-shadow">
          <h2 className="text-xl font-serif mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-secondary text-sm text-text-light uppercase tracking-widest">
                  <th className="pb-4 font-normal">Order ID</th>
                  <th className="pb-4 font-normal">Customer</th>
                  <th className="pb-4 font-normal">Date</th>
                  <th className="pb-4 font-normal">Status</th>
                  <th className="pb-4 font-normal">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-secondary/50 hover:bg-secondary/10 transition-colors">
                    <td className="py-4">#ORD-{Math.floor(Math.random() * 10000)}</td>
                    <td className="py-4">Jane Doe</td>
                    <td className="py-4">May 20, 2026</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                    </td>
                    <td className="py-4">₹{(Math.random() * 10000).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 luxury-shadow">
          <h2 className="text-xl font-serif mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-text-dark text-white py-3 text-sm tracking-widest uppercase hover:bg-accent transition-colors">
              Add New Product
            </button>
            <button className="w-full border border-text-dark text-text-dark py-3 text-sm tracking-widest uppercase hover:bg-secondary/20 transition-colors">
              Manage Inventory
            </button>
            <button className="w-full border border-text-dark text-text-dark py-3 text-sm tracking-widest uppercase hover:bg-secondary/20 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
