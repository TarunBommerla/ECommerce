import {
  RiCloseLine,
  RiMenuLine,
  RiSearchLine,
  RiShoppingBagLine,
  RiUserAddLine,
} from "@remixicon/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const isAuthenticated = false;

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        {/* Logo */}
        <div>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-3xl font-black uppercase tracking-[0.35em]"
          >
            AXION
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm uppercase tracking-[0.2em]">
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
              <Link to="/orders" className="transition hover:text-gray-300">
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
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Products..."
                className="w-56 rounded-full border border-neutral-700 bg-transparent py-2 pl-4 pr-11 text-sm outline-none transition focus:border-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <RiSearchLine />
              </button>
            </form>
          </div>

          {/* Cart */}
          <div>
            <Link
              to="/cart"
              className="relative flex items-center justify-center"
            >
              <RiShoppingBagLine
                size={24}
                className="transition hover:text-gray-300"
              />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                6
              </span>
            </Link>
          </div>

          {/* Register */}
          {!isAuthenticated && (
            <Link to="/register" className="transition hover:text-gray-300">
              <RiUserAddLine size={23} />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden">
            {open ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden bg-black transition-all duration-300 lg:hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="border-t border-neutral-800 px-5 py-6">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
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
          <ul className="flex flex-col gap-5 text-sm uppercase tracking-[0.2em]">
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
              <Link to="/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <RiShoppingBagLine size={20} />
                Cart (6)
              </Link>
            </li>

            {!isAuthenticated && (
              <li>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <RiUserAddLine size={20} />
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
