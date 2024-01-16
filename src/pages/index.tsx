import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar/Topbar";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return (
    <>
      <main className="bg-gray-600  min-h-screen  ">
        <Topbar />
        <h1 className="text-2xl text-center text-gray-900  font-medium uppercase mt-10 mb-5 ">
          &ldquo; LeetCodeClone by D3drock 👇 &ldquo;
        </h1>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10  ">
          <div className="relative overflow-x-auto mx-auto px-6 pv-10 ">
            {loadingProblems && (
              <div className=" max-w-[1200px] mx-auto sm:w-7/12 w-full  animate-pulse">
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            )}
          </div>
          <table className="text-sm text-left text-gray-200 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-300 border-b ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 w-0 font-medium text-base   text-gray-100 "
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-0 font-medium text-base  text-gray-100  "
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-0 font-medium text-base  text-gray-100 "
                  >
                    Difficulty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-0 font-medium text-base  text-gray-100 "
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-0 font-medium text-base  text-gray-100 "
                  >
                    Solution
                  </th>
                </tr>
              </thead>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </table>
        </div>
      </main>
    </>
  );
}
const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
