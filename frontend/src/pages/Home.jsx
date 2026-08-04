import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";

const products = [
  {
    _id: "6a677a6488cb2b98f6dc06f1",
    name: "product1",
    description: "product description1",
    price: 100,
    ratings: 3.5,
    brand: "Rare Rabbit1",
    stock: 1,
    numOfReviews: 2,
    images: [
      {
        public_id: "public image1",
        url: "public image url1",
        _id: "6a677a6488cb2b98f6dc06f3",
      },
    ],
    category: "Shirt 1",
    isAvailable: true,
    user: "6a67326d69500600e6cc19d7",
    createdAt: "2026-07-27T15:33:56.597Z",
    updatedAt: "2026-07-28T16:03:11.922Z",
    __v: 3,
    reviews: [
      {
        user: "6a67326d69500600e6cc19d7",
        name: "Chinnu",
        rating: 2,
        comment: "Good Product",
        _id: "6a687de42912e50fad54514e",
      },
      {
        user: "6a6867ff64111b412770e26c",
        name: "awww",
        rating: 5,
        comment: "very good product",
        _id: "6a68bd5ccdf13ccbe431c1cc",
      },
    ],
  },
  {
    _id: "6a677a7e88cb2b98f6dc06f4",
    name: "product2",
    description: "product description2",
    price: 200,
    ratings: 0,
    brand: "Rare Rabbit2",
    stock: -12,
    numOfReviews: 0,
    reviews: [
      {
        name: "user2",
        rating: 4,
        comment: "comment2",
        _id: "6a677a7e88cb2b98f6dc06f5",
      },
    ],
    images: [
      {
        public_id: "public image2",
        url: "public image url2",
        _id: "6a677a7e88cb2b98f6dc06f6",
      },
    ],
    category: "Shirt 2",
    isAvailable: true,
    user: "6a67326d69500600e6cc19d7",
    createdAt: "2026-07-27T15:34:22.208Z",
    updatedAt: "2026-07-29T18:16:46.058Z",
    __v: 0,
  },
  {
    _id: "6a677a6488cb2b98f6dc06f1",
    name: "product1",
    description: "product description1",
    price: 100,
    ratings: 3.8,
    brand: "Rare Rabbit1",
    stock: 1,
    numOfReviews: 2,
    images: [
      {
        public_id: "public image1",
        url: "public image url1",
        _id: "6a677a6488cb2b98f6dc06f3",
      },
    ],
    category: "Shirt 1",
    isAvailable: true,
    user: "6a67326d69500600e6cc19d7",
    createdAt: "2026-07-27T15:33:56.597Z",
    updatedAt: "2026-07-28T16:03:11.922Z",
    __v: 3,
    reviews: [
      {
        user: "6a67326d69500600e6cc19d7",
        name: "Chinnu",
        rating: 2,
        comment: "Good Product",
        _id: "6a687de42912e50fad54514e",
      },
      {
        user: "6a6867ff64111b412770e26c",
        name: "awww",
        rating: 5,
        comment: "very good product",
        _id: "6a68bd5ccdf13ccbe431c1cc",
      },
    ],
  },
  {
    _id: "6a677a7e88cb2b98f6dc06f4",
    name: "product2",
    description: "product description2",
    price: 200,
    ratings: 0,
    brand: "Rare Rabbit2",
    stock: -12,
    numOfReviews: 0,
    reviews: [
      {
        name: "user2",
        rating: 4,
        comment: "comment2",
        _id: "6a677a7e88cb2b98f6dc06f5",
      },
    ],
    images: [
      {
        public_id: "public image2",
        url: "public image url2",
        _id: "6a677a7e88cb2b98f6dc06f6",
      },
    ],
    category: "Shirt 2",
    isAvailable: true,
    user: "6a67326d69500600e6cc19d7",
    createdAt: "2026-07-27T15:34:22.208Z",
    updatedAt: "2026-07-29T18:16:46.058Z",
    __v: 0,
  },
  {
    _id: "6a677a6488cb2b98f6dc06f1",
    name: "product1",
    description: "product description1",
    price: 100,
    ratings: 3.8,
    brand: "Rare Rabbit1",
    stock: 1,
    numOfReviews: 2,
    images: [
      {
        public_id: "public image1",
        url: "public image url1",
        _id: "6a677a6488cb2b98f6dc06f3",
      },
    ],
    category: "Shirt 1",
    isAvailable: true,
    user: "6a67326d69500600e6cc19d7",
    createdAt: "2026-07-27T15:33:56.597Z",
    updatedAt: "2026-07-28T16:03:11.922Z",
    __v: 3,
    reviews: [
      {
        user: "6a67326d69500600e6cc19d7",
        name: "Chinnu",
        rating: 2,
        comment: "Good Product",
        _id: "6a687de42912e50fad54514e",
      },
      {
        user: "6a6867ff64111b412770e26c",
        name: "awww",
        rating: 5,
        comment: "very good product",
        _id: "6a68bd5ccdf13ccbe431c1cc",
      },
    ],
  },
  {
    _id: "6a677a7e88cb2b98f6dc06f4",
    name: "product2",
    description: "product description2",
    price: 200,
    ratings: 0,
    brand: "Rare Rabbit2",
    stock: -12,
    numOfReviews: 0,
    reviews: [
      {
        name: "user2",
        rating: 4,
        comment: "comment2",
        _id: "6a677a7e88cb2b98f6dc06f5",
      },
    ],
    images: [
      {
        public_id: "public image2",
        url: "public image url2",
        _id: "6a677a7e88cb2b98f6dc06f6",
      },
    ],
    category: "Shirt 2",
    isAvailable: true,
    user: "6a67326d69500600e6cc19d7",
    createdAt: "2026-07-27T15:34:22.208Z",
    updatedAt: "2026-07-29T18:16:46.058Z",
    __v: 0,
  },
];

const Home = () => {
  return (
    <div>
      <PageTitle title="AXION - Home"/>
      <Navbar />
      <ImageSlider />
      <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-16 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] text-gray-900">
            Trending Now
          </h2>

          <button className="text-sm uppercase tracking-widest text-gray-600 hover:text-black transition">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
