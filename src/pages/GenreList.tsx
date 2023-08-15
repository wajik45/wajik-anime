import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Header, Loader } from "../components";
import { GenreListInterface } from "../interfaces";
import { Link } from "react-router-dom";
import { online } from "../utils";

const GenreList = () => {
   const [data, setData] = useState<GenreListInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const top = useRef<HTMLSpanElement>(null);
   const BASEURL = import.meta.env.VITE_BASE_URL;
   const URL = `${BASEURL}/genre`;

   const matchCache = async () => {
      return await caches.match(URL);
   };

   const putCache = async () => {
      const response = await fetch(URL);
      const cache = await caches.open("pages");
      await cache.put(URL, response);
   };

   const getData = async () => {
      const response = await matchCache();
      return await response?.json();
   };

   useEffect(() => {
      (async () => {
         scrollTo({
            top: top.current?.offsetTop,
            left: 0,
            behavior: "smooth",
         });

         document.title = "Wajik Streaming | Genre";
         online(setRefresh, setError);
         setIsLoading(true);

         try {
            let result;

            if (await matchCache()) {
               result = await getData();

               setIsLoading(false);
               return setData(result);
            }

            await putCache();

            result = await getData();

            setIsLoading(false);
            setData(result);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [refresh]);

   return (
      <MainLayout>
         <span ref={top}></span>
         <Header route="📑 Genre" />
         {isLoading ? (
            <Loader />
         ) : error ? (
            <h1 className="text-center text-2xl py-4">{error.message}</h1>
         ) : (
            data &&
            (data.statusCode === 200 ? (
               <div className="grid gap-4 grid-cols-6 mxl:grid-cols-4 mlg:grid-cols-3 msm:grid-cols-2 mxsm:grid-cols-1">
                  {data?.list.map((item, index) => (
                     <Link
                        key={index}
                        to={`/genre/${item.slug}`}
                        className="w-full bg-zinc-700 p-4 rounded-md hover:ring-2 hover:ring-emerald-500 transition"
                     >
                        {item.title}
                     </Link>
                  ))}
               </div>
            ) : (
               <h1 className="text-center text-2xl py-4">
                  {data.error} {data.statusCode} {data.message}
               </h1>
            ))
         )}
      </MainLayout>
   );
};

export default GenreList;
