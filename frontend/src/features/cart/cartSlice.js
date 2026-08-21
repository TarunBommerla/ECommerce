import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ADD ITEMS TO CART
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { rejectWithValue, }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);

      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "An Error Occurred");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("Cart Items")) || [],
    loading: false,
    error: null,
    success: false,
    message: null,
    removingId: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    removeItemFromCart: (state, action) => {
      ((state.removingId = action.payload),
        (state.cartItems = state.cartItems.filter(
          (item) => item.product != action.payload,
        )));
      localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
      state.removingId = null;
    },
  },
  extraReducers: (builder) => {
    // ADD ITEMS TO CART CASES
    builder
      // ADD ITEMS TO CART PENDING
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      //   ADD ITEMS TO CART FULFILLED
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const existingItem = state.cartItems.find(
          (i) => i.product === item.product,
        );
        if (existingItem) {
          existingItem.quantity = item.quantity;
          state.message = "Quantity updated in your cart.";
        } else {
          state.cartItems.push(item);
          state.message = "Added to your cart.";
        }
        state.error = null;
        state.success = true;
        localStorage.setItem("Cart Items", JSON.stringify(state.cartItems));
      })

      //   ADD ITEMS TO CART REJECTED
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An Error Occurred";
      });
  },
});

export const { removeErrors, removeMessage, removeItemFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
