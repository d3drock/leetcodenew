import { auth } from "@/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success("Sent Email", { position: "top-center", autoClose: 3000 });
    }
  };
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);
  return (
    <form
      onSubmit={handleReset}
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
    >
      <h3 className="text-xl font-medium text-white">Reset Password</h3>
      <p className="text-sm text-white">
        Forgotten your password? Enter Your Email address below, and we&apos;ll
        send your an email allowing you to reset it{" "}
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="border-2 outline-none sm:text-sm rounded-lg w-full focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 bg-gray-600 border-gray-400 placeholder-gray-300 text-white "
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:text-emerald-400 hover:bg-white hover:border-1 bg-emerald-500 hover:border-emerald-400 border-1 border-transparent transition duration-300 ease-in-out  "
      >
        Reset Password
      </button>
    </form>
  );
};
export default ResetPassword;
