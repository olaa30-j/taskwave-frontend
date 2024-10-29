"use client"

import { useAppDispatch, useAppSelector } from "@/store/store"
import Navbar from "../components/nav/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import CreateTaskForm from "../components/taskform/CreateTask";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const page:React.FC<RootLayoutProps> = ({ children }) => { 
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);

  return (
    <div>
      <Navbar data={userData} />
      <Sidebar/>
      <div className="px-4 sm:ml-64 mt-[100px]">
          {children}
      </div>
    </div>
  )
}

export default page