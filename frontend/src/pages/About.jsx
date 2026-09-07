import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import {
  RiShoppingBagLine,
  RiShieldCheckLine,
  RiTruckLine,
  RiHeartLine,
} from "@remixicon/react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <PageTitle title="About AXION" />
      <Navbar />

      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900">About AXION</h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            AXION is more than just an online fashion store. We are committed to
            delivering premium-quality clothing, footwear, and accessories that
            combine style, comfort, and confidence for every customer.
          </p>
        </section>

        {/* Story Section */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Our Story
              </h2>

              <p className="mb-4 text-gray-600">
                Founded with a vision to make modern fashion accessible, AXION
                brings together carefully selected products that reflect quality
                craftsmanship and contemporary trends.
              </p>

              <p className="text-gray-600">
                Whether you're looking for everyday essentials, statement
                pieces, or premium footwear, AXION ensures a seamless shopping
                experience with trusted products and reliable service.
              </p>
            </div>

            <div className="rounded-3xl bg-black p-10 text-white shadow-xl">
              <h3 className="text-2xl font-bold">Our Mission</h3>

              <p className="mt-4 text-gray-300">
                To empower individuals through fashion by providing premium
                products, exceptional customer service, and a shopping
                experience built on trust and quality.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Why Choose AXION?
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiShoppingBagLine size={40} />
              <h3 className="mt-4 text-xl font-semibold">Premium Products</h3>
              <p className="mt-3 text-gray-600">
                Carefully curated collections with quality materials and modern
                designs.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiTruckLine size={40} />
              <h3 className="mt-4 text-xl font-semibold">Fast Delivery</h3>
              <p className="mt-3 text-gray-600">
                Reliable shipping to ensure your orders arrive safely and on
                time.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiShieldCheckLine size={40} />
              <h3 className="mt-4 text-xl font-semibold">Secure Shopping</h3>
              <p className="mt-3 text-gray-600">
                Safe and secure shopping experience with trusted payment and
                account protection.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiHeartLine size={40} />
              <h3 className="mt-4 text-xl font-semibold">Customer First</h3>
              <p className="mt-3 text-gray-600">
                Dedicated support team focused on customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 text-center md:grid-cols-4">
            <div>
              <h3 className="text-5xl font-bold">10K+</h3>
              <p className="mt-2 text-gray-300">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">500+</h3>
              <p className="mt-2 text-gray-300">Premium Products</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">99%</h3>
              <p className="mt-2 text-gray-300">Customer Satisfaction</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">24/7</h3>
              <p className="mt-2 text-gray-300">Support Available</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Join The AXION Community
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover fashion that inspires confidence and express your style
            with AXION.
          </p>

          <button className="mt-8 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800">
            <Link to="/products">Explore Collection</Link>
          </button>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
