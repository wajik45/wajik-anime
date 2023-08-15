import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { getQuery, online } from "../utils";
import { useParams } from "react-router-dom";

const Genre = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const page = getQuery("page");
   const { slug } = useParams();

   const BASEURL = import.meta.env.VITE_BASE_URL;
   const URL = `${BASEURL}/genre/${slug}?page=${page || 1}`;

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
         document.title = `Wajik Streaming | Genre : ${
            slug
               ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")
               : ""
         }`;
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
   }, [page, refresh]);

   return (
      <MainLayout>
         <Header
            route="📑 Genre"
            message={
               slug?.charAt(0).toUpperCase() +
               "" +
               slug?.slice(1).replace("-", " ")
            }
         />
         <Card data={data} isLoading={isLoading} error={error} />
      </MainLayout>
   );
};

export default Genre;
