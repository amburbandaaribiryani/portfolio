import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
// import Navbar from "./Navbar";
import { Header } from "./Header";
import { ScrollToTop } from "../components/ScrollToTop";

export const AppLayout = () => {
  return (
    <>
      <ScrollToTop /> 
      <Header />
      <Outlet />  
      <Footer />
    </>
  );
};