import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import {
   Header,
   SelectServer,
   DownloadLink,
   StreamingDescription,
   StreamingMain,
   Loader,
} from "../components";
import { StreamingInterface } from "../interfaces";
import { useParams } from "react-router-dom";
import { online } from "../utils";

const StreamingMovie = () => {
   const [data, setData] = useState<StreamingInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);
   const [videoLink, setVideoLink] = useState<string>("");

   const { slug } = useParams();

   const BASEURL = import.meta.env.VITE_BASE_URL;
   const URL = `${BASEURL}/movie/${slug}`;

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

   document.title = `Wajik Streaming | Movie : ${data?.title || ""}`;

   data &&
      scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });

   useEffect(() => {
      (async () => {
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
         <Header route="🎦 Anime" message={data?.title || ""} />
         {isLoading ? (
            <Loader />
         ) : error ? (
            <h1 className="text-center text-2xl py-4">{error.message}</h1>
         ) : (
            data &&
            (data.statusCode === 200 ? (
               <div>
                  <div className="py-4 flex justify-end gap-4">
                     <SelectServer data={data} setVideoLink={setVideoLink} />
                  </div>
                  <StreamingMain data={data} videoLink={videoLink} />
                  <DownloadLink data={data} />
                  <StreamingDescription data={data} />
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

export default StreamingMovie;
