import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { getQuery, online } from "../utils";
import { useParams } from "react-router-dom";

const Search = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const top = useRef<HTMLSpanElement>(null);
   const { keyword } = useParams();
   const page = getQuery("page");
   const URL = `${
      import.meta.env.VITE_BASE_URL
   }/search/?query=${keyword}&page=${page || 1}`;

   useEffect(() => {
      (async () => {
         scrollTo({
            top: top.current?.offsetTop,
            left: 0,
            behavior: "smooth",
         });

         document.title = `Wajik Streaming | Search : ${keyword}`;
         online(setRefresh, setError);
         setIsLoading(true);

         try {
            const response = await fetch(URL);
            const result = await response.json();

            setIsLoading(false);
            setData(result);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [page, keyword, refresh]);

   return (
      <MainLayout>
         <span ref={top}></span>
         <Header route="🔎 Search" message={keyword} />
         <Card
            data={data}
            isLoading={isLoading}
            keyword={keyword}
            error={error}
         />
      </MainLayout>
   );
};

export default Search;
