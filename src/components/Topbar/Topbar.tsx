import Logout from "@/Buttons/Logout";
import { authModalState } from "@/atom/authModalAtoms";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { Problem } from "@/utils/types/problem";
type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );
    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };
  return (
    <nav className="relative flex  h-[55px] shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7 ">
      <div
        className={`flex w-full items-center justify-between  ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        } `}
      >
        <Link
          href={"/"}
          className={`h-[25px]   ${problemPage ? "" : "flex-1"}`}
        >
          <Image src="/logo-full.png" alt="logo" height={100} width={100} />
        </Link>
        {problemPage && (
          <div className="flex  items-center justify-center gap-4 flex-1  ">
            <div
              onClick={() => handleProblemChange(false)}
              className="flex items-center justify-center rounded dark-fill-3 bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer  "
            >
              <FaChevronLeft />
            </div>
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium  cursor-pointer text-dark-gray-8 "
            >
              <div>
                <BsList />
              </div>
              <p>ProblemList</p>
            </Link>
            <div
              onClick={() => handleProblemChange(true)}
              className="flex items-center justify-center rounded dark-fill-3 bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer  "
            >
              <FaChevronRight />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4 justify-end ">
          {!user && (
            <Link href={"/auth"}>
              <button
                onClick={() =>
                  setAuthModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "login",
                  }))
                }
                className=" bg-emerald-500 text-white px-2 py-0.5 sm:px-4 rounded-md text-md font-medium hover:text-emerald-500 hover:bg-white hover:border-2 hover:border-emerald-500 border-2 border-transparent transition duration-300 ease-in-out"
              >
                Sign In
              </button>
            </Link>
          )}
          {user && problemPage && <Timer />}
          {user && (
            <div className="cursor-pointer group relative ">
              <Image
                src="/avatar.png"
                alt="user profile pic"
                height={30}
                width={30}
              />
              <div
                className="absolute top-10 right-2 translate-x-2/4  mx-auto bg-dark-layer-1 text-emerald-500 p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
