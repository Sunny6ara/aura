import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(i => i._id === item._id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(i => 
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        )
      };
    }
    return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(i => i._id !== id)
  })),
  clearCart: () => set({ cartItems: [] }),
}));
