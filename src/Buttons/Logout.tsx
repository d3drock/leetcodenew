import { auth } from "@/firebase/firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
  };
  return (
    <button
      className="bg-dark-fill-3  py-1.5 px-3 cursor-pointer rounded text-white "
      onClick={handleLogout}
    >
      <FiLogOut size={27} />
    </button>
  );
};
export default Logout;
