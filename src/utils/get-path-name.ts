import { useLocation } from "react-router-dom";

export const getPathName = (): string => {
   const location = useLocation();
   return location.pathname;
};
