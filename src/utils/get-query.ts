import { useLocation } from "react-router-dom";

const getQuery = (key: "page" | "search"): string | null => {
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   return params.get(key);
};

export { getQuery };
