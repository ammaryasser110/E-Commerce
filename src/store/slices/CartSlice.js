import { createSlice } from "@reduxjs/toolkit";

// 🔹 current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// 🔹 cart key per user
const getCartKey = () => {
  const user = getCurrentUser();
  return user ? `cart_${user.id}` : "cart_guest";
};

// 🔹 load cart
const loadCart = () => {
  const key = getCartKey();
  return JSON.parse(localStorage.getItem(key)) || [];
};

const getTotal = (items) =>
  items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

// 🔹 save + calculate total
const calculateTotal = (state) => {
  state.totalAmount = state.items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  const key = getCartKey();
  localStorage.setItem(key, JSON.stringify(state.items));
};

const initialItems = loadCart();

const initialState = {
  items: initialItems,
  totalAmount: getTotal(initialItems),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // ➕ add product
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      calculateTotal(state);
    },

    // ➖ remove product completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      calculateTotal(state);
    },

    // 🧹 clear cart
    clearCart: (state) => {
      state.items = [];
      calculateTotal(state);
    },

    // ➕ increase quantity
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      calculateTotal(state);
    },

    // ➖ decrease quantity
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }

      calculateTotal(state);
    },
  },
});

// ✅ exports
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
