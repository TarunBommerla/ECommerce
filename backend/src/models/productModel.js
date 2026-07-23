import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter The Product Name"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please Enter The Product Description "],
      trim: true,
    },

    price: {
      type: Number,
      default: 0,
      required: [true, "Please Enter The Product Price"],
      min: 0,
    },

    ratings: {
      type: Number,
      default: 0,
    },

    brand: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      min: 1,
      required: true,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        name: {
          type: String,
          required: true,
        },

        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
