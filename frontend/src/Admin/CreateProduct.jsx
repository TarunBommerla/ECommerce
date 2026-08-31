import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "T-Shirts",
    "Shirts",
    "Hoodies",
    "Jackets",
    "Jeans",
    "Trousers",
    "Shorts",
    "Sneakers",
    "Accessories",
  ];

  const createProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("brand", brand);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    console.log("Images State:", image);
    image.forEach((img) => {
      myForm.append("images", img);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImage = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Product Created", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      setName("");
      setBrand("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImage([]);
      setImagePreview([]);
    }
  }, [dispatch, error, success]);
  return (
    <>
      <Navbar />
      <PageTitle title="Create Product" />

      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Create Product
              </h1>
              <p className="mt-2 text-gray-500">
                Add a new product to your AXION store inventory.
              </p>
            </div>

            <form
              encType="multipart/form-data"
              className="space-y-5"
              onSubmit={createProductSubmit}
            >
              {/* Product Name */}
              <input
                type="text"
                placeholder="Enter Product Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

              {/* Product Brand */}
              <input
                type="text"
                placeholder="Enter Product Brand"
                required
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

              {/* Product Price */}
              <input
                type="number"
                placeholder="Enter Product Price"
                required
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

              {/* Description */}
              <input
                type="text"
                placeholder="Enter Product Description"
                required
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

              {/* Category */}
              <select
                required
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              >
                <option value="">Choose Category</option>
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* Stock */}
              <input
                type="number"
                placeholder="Enter Product Stock"
                required
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

              {/* Image Upload */}
              <div className="rounded-xl border border-dashed border-gray-300 p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="image"
                  onChange={createProductImage}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-lg file:border-0
                  file:bg-black file:px-4 file:py-2
                  file:text-sm file:font-medium
                  file:text-white hover:file:bg-gray-800"
                />
              </div>

              {/* Image Preview */}
              <div className="flex flex-wrap gap-4">
                {imagePreview.map((img, index) => (
                  <img
                    src={img}
                    alt="Product Preview"
                    key={index}
                    className="h-24 w-24 rounded-xl border border-gray-200 object-cover shadow-sm"
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer">
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateProduct;
