import { problems } from "@/mockProblems/problems";
import Link from "next/link";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const [youtube, setYoutube] = useState({ isOpen: false, videoId: "" });
  const solvedProblems = useSolvedProblems();
  const problems = useGetProblems(setLoadingProblems);

  const closeModal = () => {
    setYoutube({ isOpen: false, videoId: "" });
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return (
    <>
      <tbody className='text-white'>
        {problems.map((problem, idx) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? "text-dark-green-s"
              : problem.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";
          return (
            <tr
              className={`${idx % 2 === 1 ? "bg-gray-700" : ""}`}
              key={problem.id}
            >
              <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s '>
                {solvedProblems.includes(problem.id) && (
                  <BsCheckCircle fontsize={"18"} width='18' />
                )}
              </th>
              <td className='px-4 py-4 '>
                {problem.link ? (
                  <Link href={problem.link} className='hover:text-black'>
                    {problem.title}
                  </Link>
                ) : (
                  <Link
                    className='hover:text-black cursor-pointer '
                    href={`/problems/${problem.id}`}
                    target='_blank'
                  >
                    {problem.title}
                  </Link>
                )}
              </td>
              <td className={`px-7 py-4 ${difficultyColor} `}>
                {problem.difficulty}
              </td>
              <td className={`px-7 py-4  `}>{problem.category}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
export default ProblemsTable;

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);

      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapShot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapShot.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      console.log(tmp);
      setProblems(tmp);
      setLoadingProblems(false);
    };

    getProblems();
  }, []);
  return problems;
}

function useSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
    };

    if (user) getSolvedProblems();
    if (!user) setSolvedProblems([]);
  }, [user]);
  return solvedProblems;
}
