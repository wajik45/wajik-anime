import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { getQuery, online } from "../utils";

const Home = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const page = getQuery("page");

   const BASEURL = import.meta.env.VITE_BASE_URL;
   const URL = `${BASEURL}/home?page=${page || 1}`;

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
         document.title = "Wajik Streaming | Home";
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
         } catch (err: any) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [page, refresh]);

   return (
      <MainLayout>
         <Header route="🏠 Home" message="terbaru" />
         <Card data={data} isLoading={isLoading} error={error} />
      </MainLayout>
   );
};

export default Home;
