import { authModalState } from "@/atom/authModalAtoms";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert("Please fill all fields");
    try {
      toast.loading("Creating Your Account", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };
  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);
  return (
    <form className="space-y-6 px-6 pb-4 " onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">
        Register To LeetCodeClone
      </h3>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="border-2 outline-none sm:text-sm rounded-lg w-full focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 bg-gray-600 border-gray-400 placeholder-gray-300 text-white "
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-md font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          placeholder="displayName"
          className="border-2 outline-none sm:text-sm rounded-lg w-full focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 bg-gray-600 border-gray-400 placeholder-gray-300 text-white "
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          placeholder="*********"
          className="border-2 outline-none sm:text-sm rounded-lg w-full focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 bg-gray-600 border-gray-400 placeholder-gray-300 text-white "
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:text-emerald-400 hover:bg-white hover:border-1 bg-emerald-500 hover:border-emerald-400 border-1 border-transparent transition duration-300 ease-in-out  "
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div
        onClick={handleClick}
        className="text-sm font-medium text-gray-400 gap-x-4 "
      >
        Already have an account?{"  "}
        <a href="#" className="text-emerald-500">
          Login
        </a>
      </div>
    </form>
  );
};
export default SignUp;
