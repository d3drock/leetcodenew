import { authModalState } from "@/atom/authModalAtoms";
import React from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);
  return (
    <form className="space-y-6 px-6 pb-4 " onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white ">
        Sign In to LeetCodeClone
      </h3>
      <div>
        <label className="text-md font-medium block mb-2 text-gray-300 ">
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="border-2 outline-none sm:text-sm rounded-lg w-full focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 bg-gray-600 border-gray-400 placeholder-gray-300 text-white "
        />
      </div>
      <div>
        <label className="text-md font-medium block mb-2 text-gray-300 ">
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          className="border-2 outline-none sm:text-sm rounded-lg w-full focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 bg-gray-600 border-gray-400 placeholder-gray-300 text-white "
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:text-emerald-400 hover:bg-white hover:border-1 bg-emerald-500 hover:border-emerald-400 border-1 border-transparent transition duration-300 ease-in-out  "
      >
        {loading ? "LogingIn..." : "Login"}
      </button>
      <button
        onClick={() => handleClick("forgotPassword")}
        className="flex w-full justify-end"
      >
        <a
          href="#"
          className="text-sm block text-emerald-600 hover:underline w-full text-right "
        >
          Forget Password
        </a>
      </button>
      <div
        onClick={() => handleClick("register")}
        className="text-sm font-medium text-gray-400 gap-x-4 "
      >
        Not Registered?{"  "}
        <a href="#" className="text-emerald-500">
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;
