import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { ShippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(ShippingInfo.address || "");
  const [pinCode, setPinCode] = useState(ShippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(ShippingInfo.phoneNumber || "");
  const [country, setCountry] = useState(ShippingInfo.country || "");
  const [state, setState] = useState(ShippingInfo.state || "");
  const [city, setCity] = useState(ShippingInfo.city || "");

  const shippingInfoSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast.error("Invalid Phone Number! It Should 10 Digits", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(
      saveShippingInfo({ address, pinCode, phoneNumber, country, state, city }),
    );
    navigate("/order/confirm")
  };
  return (
    <>
      <PageTitle title="Shipping Info" />
      <Navbar />
      <CheckoutPath activePath={0} />

      <div className="h-auto bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-4xl mb-10">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Shipping Details
            </h1>

            <form className="space-y-8" onSubmit={shippingInfoSubmit}>
              {/* Address Details */}
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your Address"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pinCode"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    PinCode
                  </label>
                  <input
                    type="number"
                    id="pinCode"
                    name="pinCode"
                    placeholder="Enter your PinCode"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your Phone Number"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setState("");
                      setCity("");
                    }}
                  >
                    <option value="">Select Your Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    name="state"
                    id="state"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setCity("");
                    }}
                  >
                    <option value="">Select Your State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <select
                    name="city"
                    id="city"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select Your City</option>
                    {City &&
                      City.getCitiesOfState(country, state).map((item) => (
                        <option value={item.name} key={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Continue Button */}
              <button className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shipping;
