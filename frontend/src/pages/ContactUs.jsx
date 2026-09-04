import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiCustomerService2Line,
} from "@remixicon/react";

const Contact = () => {
  return (
    <>
      <PageTitle title="Contact Us" />
      <Navbar />

      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Get In Touch With AXION
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Have questions about products, orders, returns, or partnerships?
            Our support team is ready to help you.
          </p>
        </section>

        {/* Contact Cards */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiMailLine size={40} className="mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Email Us</h3>
              <p className="text-gray-600">
                support@axion.com
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiPhoneLine size={40} className="mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Call Us</h3>
              <p className="text-gray-600">
                +91 98765 43210
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <RiMapPinLine size={40} className="mb-4" />
              <h3 className="mb-2 text-xl font-semibold">Visit Us</h3>
              <p className="text-gray-600">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-bold">
                Send Us A Message
              </h2>

              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />

                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Support Section */}
            <div className="rounded-3xl border border-gray-200 bg-black p-8 text-white shadow-lg">
              <RiCustomerService2Line size={60} />

              <h2 className="mt-6 text-3xl font-bold">
                We're Here To Help
              </h2>

              <p className="mt-4 text-gray-300">
                Whether you need assistance with your order, product
                recommendations, shipping updates, or returns, the AXION
                support team is available to assist you.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <h3 className="font-semibold">Customer Support</h3>
                  <p className="text-gray-300">
                    support@axion.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Business Inquiries</h3>
                  <p className="text-gray-300">
                    business@axion.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Working Hours</h3>
                  <p className="text-gray-300">
                    Monday - Saturday
                  </p>
                  <p className="text-gray-300">
                    9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Contact;