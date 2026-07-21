import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  pricePerItem: number;
  image: string;
}

export interface CustomerForm {
  name: string;
  phone: string;
  state: string;
  city: string;
  distrito: string;
  address: string;
  reference: string;
}

interface UIState {
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isUpsellOpen: boolean;
}

interface CartStore {
  items: CartItem[];
  ui: UIState;
  customerForm: CustomerForm | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openUpsell: (form: CustomerForm) => void;
  closeUpsell: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  ui: { isCartOpen: false, isCheckoutOpen: false, isUpsellOpen: false },
  customerForm: null,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity, pricePerItem: item.pricePerItem }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clearCart: () => set({ items: [] }),

  openCart: () => set((s) => ({ ui: { ...s.ui, isCartOpen: true } })),
  closeCart: () => set((s) => ({ ui: { ...s.ui, isCartOpen: false } })),
  openCheckout: () =>
    set((s) => ({ ui: { ...s.ui, isCheckoutOpen: true, isCartOpen: false } })),
  closeCheckout: () => set((s) => ({ ui: { ...s.ui, isCheckoutOpen: false } })),
  openUpsell: (form: CustomerForm) =>
    set((s) => ({ ui: { ...s.ui, isUpsellOpen: true, isCheckoutOpen: false }, customerForm: form })),
  closeUpsell: () => set((s) => ({ ui: { ...s.ui, isUpsellOpen: false } })),

  subtotal: () => get().items.reduce((acc, i) => acc + i.pricePerItem * i.quantity, 0),
}));
