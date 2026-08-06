import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GETTING ALL PRODUCTS
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      let link = "/api/v1/products?page=" + page;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (category) {
        link += `&category=${category}`;
      }
      const { data } = await axios.get(link);
      console.log("respose", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occured");
    }
  },
);

// GETTING SINGLE PRODUCTS
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/v1/product/${id}`;
      const { data } = await axios.get(link);
      console.log("respose", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occured");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
    resultsPerPage: 5,
    totalPages: 0,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GETTING ALL PRODUCTS
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("Fullfilled action payload", action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.products = [];
      });

    // GETTING SINGLE PRODUCT
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log("Fullfilled action payload", action.payload);
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
