import { useLocation } from "react-router-dom";

export default (): string => {
   const location = useLocation();
   return location.pathname;
};
