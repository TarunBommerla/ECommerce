import {
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
  RiShoppingBagLine,
  RiUserAddLine,
} from "@remixicon/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const keyword = searchQuery.trim();

    if (keyword) {
      navigate(`/products?keyword=${encodeURIComponent(keyword)}&page=1`);
    } else {
      navigate(`/products?page=1`);
    }

    setSearchQuery("");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black text-white">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-2 px-20 py-3 max-[1920px]:max-w-8xl max-[1440px]:max-w-8xl max-[1280px]:max-w-7xl max-[1024px]:max-w-7xl">
        {/* Logo */}
        <div className="shrink-0">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-lg font-black uppercase tracking-[0.12em] sm:text-2xl sm:tracking-[0.28em] lg:text-3xl lg:tracking-[0.35em]"
          >
            AXION
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-5 text-xs uppercase tracking-[0.14em] xl:gap-8 xl:text-sm xl:tracking-[0.2em]">
            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="transition hover:text-gray-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="transition hover:text-gray-300">
                Products
              </Link>
            </li>

            <li>
              <Link to="/myOrders" className="transition hover:text-gray-300">
                Orders
              </Link>
            </li>

            <li>
              <Link to="/contact" className="transition hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Products..."
                className="w-40 rounded-full border border-neutral-700 bg-transparent py-2 pl-4 pr-10 text-xs outline-none transition focus:border-white lg:w-48 xl:w-56 xl:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 xl:right-4"
              >
                <RiSearchLine size={20} />
              </button>
            </form>
          </div>

          {/* Cart */}
          <div className="shrink-0">
            <Link
              to="/cart"
              className="relative flex items-center justify-center"
            >
              <RiShoppingBagLine
                size={22}
                className="transition hover:text-gray-300 sm:size-6"
              />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black sm:h-5 sm:w-5 sm:text-[10px]">
                {cartItems.length}
              </span>
            </Link>
          </div>

          {/* Register */}
          {!isAuthenticated && (
            <Link
              to="/register"
              className="shrink-0 transition hover:text-gray-300"
            >
              <RiUserAddLine size={20} />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="shrink-0 lg:hidden">
            {open ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden bg-black transition-all duration-300 lg:hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="border-t border-neutral-800 px-4 py-5 sm:px-5 sm:py-6">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative mb-5 md:hidden"
          >
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-700 bg-transparent py-3 pl-4 pr-11 text-sm outline-none"
            />

            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <RiSearchLine />
            </button>
          </form>

          {/* Mobile Links */}
          <ul className="flex flex-col gap-4 text-sm uppercase tracking-[0.14em] sm:gap-5 sm:tracking-[0.2em]">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" onClick={() => setOpen(false)}>
                Products
              </Link>
            </li>

            <li>
              <Link to="/myOrders" onClick={() => setOpen(false)}>
                Orders
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>

            {!isAuthenticated && (
              <li>
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="hidden sm:block shrink-0 transition hover:text-gray-300"
                  >
                    <RiUserAddLine size={20} />
                  </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
