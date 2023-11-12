import { HiMenuAlt1 } from "react-icons/hi";
import Logo2 from "../assets/Logo2.svg";
import Logo from "../assets/Logo.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const [stateNav, setStateNav] = useState<Boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const toggleNav = () => {
    setStateNav(!stateNav);
  };

  return (
    <>
      <div className="w-full h-20 p-5 bg-primary-color shadow-sm flex items-center relative justify-between z-10 md:gap-5">
        <HiMenuAlt1
          className="text-white text-3xl lg:hidden"
          onClick={toggleNav}
        />
        <div className="hidden lg:flex gap-6 justify-center text-white">
          <Link to="/">Home</Link>
          <Link to="/movie">Movie List</Link>
          <Link to="/tv-show">TV Show List</Link>
        </div>

        <div className="grow flex justify-center">
          <form>
            <input
              type="text"
              className="rounded-full lg:w-[20em] bg-white border px-3 py-1 outline-none text-gray-600 hidden lg:block"
              placeholder="Seacrh For Movie Or TV Show"
              name="search"
              onChange={(e) => {
                setSearchTitle(e.target.value);
              }}
            />
          </form>
        </div>

        <img src={Logo2} alt="logo" className="w-10 md:hidden" />
        <img src={Logo} alt="logo" className="w-32 hidden md:block" />
      </div>

      <AnimatePresence>
        {stateNav && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{
              ease: "linear",
              duration: 0.3,
            }}
            className="flex flex-col gap-3 p-5 bg-primary-color text-white absolute w-full text-center"
          >
            <Link to="/" onClick={toggleNav}>
              Home
            </Link>
            <Link to="/movie" onClick={toggleNav}>
              Movie List
            </Link>
            <Link to="/tv-show" onClick={toggleNav}>
              TV Show List
            </Link>
            <div className="border-t pt-2 mt-1 border-white">
              <form>
                <input
                  type="text"
                  className="rounded-full w-full bg-white border px-2 py-1 outline-none text-gray-600"
                  placeholder="Seacrh For Movie Or TV Show"
                  name="search"
                  onChange={(e) => {
                    setSearchTitle(e.target.value);
                  }}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavbarComponent;
