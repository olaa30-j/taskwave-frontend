"use client"

import { useAppSelector } from "@/store/store"
import Navbar from "../components/nav/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}


const DashboardLayout:React.FC<DashboardLayoutProps> = ({ children }) => { 
  const { userData } = useAppSelector(state => state.auth);
  const [ openSidebar, setOpenSidebar ] = useState<boolean>(false)

  return (
    <div>
      <Navbar data={userData} setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
      <Sidebar openSidebar={openSidebar}/>
      <div className="px-4 sm:ml-64 mt-[100px]">
          {children}
      </div>
    </div>
  )
}

export default DashboardLayout