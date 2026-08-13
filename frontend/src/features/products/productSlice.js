import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =====================================================
// GET ALL PRODUCTS API
// =====================================================
// This async thunk is used to fetch all products from backend.
// It supports:
// 1. Keyword search
// 2. Pagination
// 3. Category filtering
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      // Base API URL with page number
      let link = "/api/v1/products?page=" + page;

      // Add keyword search query if user searches something
      // Example: /products?page=1&keyword=shirt
      if (keyword) {
        link += `&keyword=${keyword}`;
      }

      // Add category filter query if category is selected
      // Example: /products?page=1&category=clothing
      if (category) {
        link += `&category=${category}`;
      }

      // Sending GET request to backend
      const { data } = await axios.get(link);
      console.log("respose", data);

      // Returning API response
      // This will be stored in action.payload
      return data;
    } catch (error) {
      // If API fails, send error message to rejected case
      return rejectWithValue(error.response?.data || "An error occured");
    }
  },
);

// =====================================================
// GET SINGLE PRODUCT DETAILS API
// =====================================================
// Fetches details of one specific product using product id
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      // API endpoint for single product
      const link = `/api/v1/product/${id}`;

      // Sending GET request
      const { data } = await axios.get(link);
      console.log("respose", data);

      // Returning product data
      return data;
    } catch (error) {
      // Handling API errors
      return rejectWithValue(error.response?.data || "An error occured");
    }
  },
);

// =====================================================
// PRODUCT SLICE
// =====================================================
const productSlice = createSlice({
  // Slice name
  name: "product",

  // Initial Redux state
  initialState: {
    // Stores all products
    products: [],

    // Total number of products available
    productCount: 0,

    // Loading status
    loading: false,

    // Stores error messages
    error: null,

    // Stores single product details
    product: null,

    // Number of products shown per page
    resultsPerPage: 5,

    // Total available pages for pagination
    totalPages: 0,
  },

  // =====================================================
  // NORMAL REDUCERS
  // =====================================================
  reducers: {
    // Clears previous errors
    removeErrors: (state) => {
      state.error = null;
    },
  },

  // =====================================================
  // HANDLE ASYNC THUNK STATES
  // =====================================================
  extraReducers: (builder) => {
    // =====================================================
    // GET ALL PRODUCTS CASES
    // =====================================================
    builder
      // When API request starts
      .addCase(getProduct.pending, (state) => {
        state.loading = true;

        // Clear previous errors
        state.error = null;
      })

      // When products are successfully received
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("Fullfilled action payload", action.payload);
        // Stop loading
        state.loading = false;

        // Remove old errors
        state.error = null;

        // Store products from backend response
        state.products = action.payload.products;

        // Store total number of products
        state.productCount = action.payload.productCount;

        // Store products displayed per page
        state.resultsPerPage = action.payload.resultsPerPage;

        // Store total pagination pages
        state.totalPages = action.payload.totalPages;
      })

      // When API request fails
      .addCase(getProduct.rejected, (state, action) => {
        // Stop loading
        state.loading = false;
         // Store error message
        state.error = action.payload || "Something went wrong";
        // Clear products if request fails
        state.products = [];
      });

    // =====================================================
    // GET SINGLE PRODUCT CASES
    // =====================================================
    builder
    // When fetching single product starts
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // When single product data received
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log("Fullfilled action payload", action.payload);

        // Stop loading
        state.loading = false;

        // Clear errors
        state.error = null;

        // Store single product details
        state.product = action.payload.product;
      })

       // When fetching single product fails
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { removeErrors } = productSlice.actions;

// Export reducer to store
export default productSlice.reducer;
