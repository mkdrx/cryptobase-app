import { Link, useNavigate } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const navHandler = () => {
    setNav(!nav);
  };

  const signOutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">Cryptobase</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggler />
      </div>
      {user?.email ? (
        <div>
          <Link to="/account" className="p-4">
            Account
          </Link>
          <button onClick={signOutHandler}>Sign out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}
      <div onClick={navHandler} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={navHandler} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={navHandler} className="border-b py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-6">
            <ThemeToggler />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button
              onClick={navHandler}
              className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
            >
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button
              onClick={navHandler}
              className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
