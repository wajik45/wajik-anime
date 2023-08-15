import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import {
   Header,
   SelectServer,
   SelectEpisode,
   DownloadLink,
   StreamingDescription,
   StreamingMain,
   Loader,
} from "../components";
import { StreamingInterface } from "../interfaces";
import { useParams } from "react-router-dom";
import { online } from "../utils";

const StreamingAnime = () => {
   const [data, setData] = useState<StreamingInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);
   const [videoLink, setVideoLink] = useState<string>("");

   const { slug, episode } = useParams();
   const selectServer = useRef<HTMLSelectElement>(null);

   const BASEURL = import.meta.env.VITE_BASE_URL;
   const URL = `${BASEURL}/anime/${slug}/${episode}`;

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

   document.title = `Wajik Streaming | Anime : ${data?.title || ""} | Episode ${
      (data && episode) || ""
   }`;

   useEffect(() => {
      (async () => {
         scrollTo({
            top: 0,
            behavior: "instant",
         });
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
   }, [episode, refresh]);

   useEffect(() => {
      if (selectServer.current) {
         selectServer.current.selectedIndex = 0;
      }

      if (data) {
         setVideoLink(data.videoPlayer[0].url);
      }
   }, [data]);

   const episodes: number[] = [];

   if (data?.currentTotalEpisodes) {
      for (let i = 0; i < data.currentTotalEpisodes; i++) {
         episodes.push(i + 1);
      }
   }

   return (
      <MainLayout>
         <Header
            route="🎦 Anime"
            message={data ? `${data.title} > Eps ${episode}` : ""}
         />
         {isLoading ? (
            <Loader />
         ) : error ? (
            <h1 className="text-center text-2xl py-4">{error.message}</h1>
         ) : (
            data &&
            (data.statusCode === 200 ? (
               <div>
                  <div className="py-4 flex justify-end gap-4">
                     <SelectServer
                        data={data}
                        setVideoLink={setVideoLink}
                        selectServer={selectServer}
                     />
                     <SelectEpisode episodes={episodes} slug={slug} />
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

export default StreamingAnime;
