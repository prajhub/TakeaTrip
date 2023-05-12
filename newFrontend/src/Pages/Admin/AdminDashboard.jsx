import React from "react";
import { useLocation } from "react-router";
import Header from "../../Components/Reusables/SimpleHeader";
import SideBar from "../../Components/AdminComponents/Sidebar";
import MainBody from "../../Components/AdminComponents/MainBody";

const AdminDashboard = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <SideBar />
      <MainBody />
    </>
  );
};

export default AdminDashboard;
