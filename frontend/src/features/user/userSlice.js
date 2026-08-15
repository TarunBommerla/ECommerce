import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// REGISTER API
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/register", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Registration data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration Failed. Please try again later",
      );
    }
  },
);

// LOGIN API
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config,
      );
      console.log("Login data", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login Failed. Please try again later",
      );
    }
  },
);

// LOADING USER
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Load User Profile",
      );
    }
  },
);

// LOGOUT USER
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to Logout");
    }
  },
);

// UPDATEPROFILE USER
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        "/api/v1/profile/update",
        userData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Profile Update Failed. Please Try Again Later",
        },
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    message: null,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },

    removeSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    // ------------------------- REGISTER CASES
    builder
      // REGISTER PENDING
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // REGISTER SUCCESS
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })

      // REGISTER FAILED
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Registration Failed. Please try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    // ------------------------- LOGIN CASES
    builder
      // LOGIN PENDING
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
      })

      // LOGIN FAILED
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Login Failed. Please try again later";

        state.user = null;
        state.isAuthenticated = false;
      });

    // ------------------------- LOADING USER CASES
    builder
      // LOADING USER PENDING
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOADING USER SUCCESS
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
      })

      // LOADING USER FAILED
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Load User Profile";
        state.user = null;
        state.isAuthenticated = false;
      });

    // ------------------------- LOGOUT CASES
    builder
      // LOGOUT PENDING
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGOUT USER SUCCESS
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGOUT USER FAILED
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Logout";
      });

    // ------------------------- UPDATEPROFILE CASES
    builder
      // UPDATEPROFILE PENDING
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // UPDATEPROFILE USER SUCCESS
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })

      // UPDATEPROFILE USER FAILED
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Profile Update Failed. Please Try Again Later";
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;

export default userSlice.reducer;
