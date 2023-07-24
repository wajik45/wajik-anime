import { useEffect } from "react";
import page404 from "../assets/page-404/page-404.svg";

const NotFound = () => {
   useEffect(() => {
      document.title = "Wajik Streaming | Not found";
   }, []);
   return (
      <div className="h-screen flex justify-center items-center">
         <img src={page404} alt="Not found" className="w-full h-full" />
      </div>
   );
};

export default NotFound;
