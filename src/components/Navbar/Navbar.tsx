import { authModalState } from "@/atom/authModalAtoms";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href={"/"} className="flex items-center justify-center h-20 ">
        <Image
          height={100}
          width={160}
          src="/logo.png"
          alt="LeetCode"
          className="h-full"
        />
      </Link>
      <div className="flex items-center">
        <button
          onClick={handleClick}
          className="bg-emerald-400 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-emerald-400 hover:bg-white hover:border-1 hover:border-emerald-400 border-1 border-transparent transition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
