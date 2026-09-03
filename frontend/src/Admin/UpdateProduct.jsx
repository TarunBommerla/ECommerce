import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";
import {
  removeErrors,
  removeSuccess,
  updateProduct,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { product } = useSelector((state) => state.product);
  const { success, loading, error } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();

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

  useEffect(() => {
    dispatch(getProductDetails(updateId));
  }, [dispatch, updateId]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.images);
    }
  }, [product]);
  const handleImageChange = (e) => {
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

  const updateProductSubmit = (e) => {
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
    dispatch(updateProduct({ id: updateId, formData: myForm }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Product Updated", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, success, error]);
  return (
    <>
      <Navbar />
      <PageTitle title="Admin | Update Product" />

      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Update Product
              </h1>
              <p className="mt-2 text-gray-500">
                Modify product details and update inventory information.
              </p>
            </div>

            <form
              encType="multipart/form-data"
              className="space-y-5"
              onSubmit={updateProductSubmit}
            >
              {/* Product Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Product Brand */}
              <div>
                <label
                  htmlFor="brand"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Brand
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Brand"
                  required
                  id="brand"
                  name="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Product Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  required
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Description
                </label>
                <textarea
                  required
                  id="description"
                  name="description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                >
                  <option value="">Choose a Category</option>
                  {categories.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Stock
                </label>
                <input
                  type="number"
                  required
                  id="stock"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Product Images
                </label>

                <div className="rounded-xl border border-dashed border-gray-300 p-4">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    multiple
                    className="block w-full text-sm text-gray-500
              file:mr-4 file:rounded-lg file:border-0
              file:bg-black file:px-4 file:py-2
              file:text-sm file:font-medium
              file:text-white hover:file:bg-gray-800"
                  />
                </div>
              </div>

              {/* New Image Preview */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  New Images Preview
                </h3>

                <div className="flex flex-wrap gap-4">
                  {imagePreview.map((img, index) => (
                    <img
                      src={img}
                      key={index}
                      alt="product preview"
                      className="h-24 w-24 rounded-xl border border-gray-200 object-cover shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Existing Images */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Existing Images
                </h3>

                <div className="flex flex-wrap gap-4">
                  {oldImage.map((img, index) => (
                    <img
                      src={img.url}
                      key={index}
                      alt="old product preview"
                      className="h-24 w-24 rounded-xl border border-gray-200 object-cover shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full cursor-pointer rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95">
                {loading ? "Updating" : "Update Product"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UpdateProduct;
