import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------------------- CREATE ORDER
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/new/order", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order Creating Failed");
    }
  },
);

// ----------------------------------- GET ALL MY ORDERS
export const getAllMyOrders = createAsyncThunk(
  "order/getAllMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/MyOrders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed To Fetch Orders");
    }
  },
);

// ----------------------------------- GET ORDER DETAILS
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderID, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${orderID}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed To Fetch Order Details");
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    success: false,
    loading: false,
    error: null,
    orders: [],
    order: {},
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // CREATE ORDER
    builder
      // createOrder PENDING
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // createOrder FULLFILLED
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.order;
        state.success = action.payload?.success;
      })

      // createOrder REJECTED
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Order Creating Failed";
      });

    // GET ALL MY ORDERS
    builder
      // getAllMyOrders PENDING
      .addCase(getAllMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // getAllMyOrders FULLFILLED
      .addCase(getAllMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.orders;
        state.success = action.payload?.success;
      })

      // getAllMyOrders REJECTED
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed To Fetch Orders";
      });

      // GET ORDER DETAILS
    builder
      // getOrderDetails PENDING
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // getOrderDetails FULLFILLED
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.order;
        state.success = action.payload?.success;
      })

      // getOrderDetails REJECTED
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed To Fetch Order Details";
      });
  },
});

export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;
