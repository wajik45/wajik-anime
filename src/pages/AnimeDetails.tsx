import MainLayout from "../layouts/MainLayout";
import poster404 from "../assets/poster-404/poster-404.jpg";
import { useEffect, useState } from "react";
import { Header, Loader } from "../components";
import { AnimeDetailsInterface } from "../interfaces";
import { Link, useParams } from "react-router-dom";
import { online } from "../utils";

const AnimeDetails = () => {
   const [data, setData] = useState<AnimeDetailsInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const { slug } = useParams();

   const BASEURL = import.meta.env.VITE_BASE_URL;
   const URL = `${BASEURL}/anime/${slug}`;

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

   document.title = `Wajik Streaming | Anime : ${data?.title || ""}`;

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

   const episodes: number[] = [];

   if (data) {
      for (let i = 0; i < data.currentTotalEpisodes; i++) {
         episodes.push(i + 1);
      }
   }

   return (
      <MainLayout>
         <Header route="🎦 Anime" message={data?.title} />
         {isLoading ? (
            <Loader />
         ) : error ? (
            <h1 className="text-center text-2xl py-4">{error.message}</h1>
         ) : (
            data &&
            (data.statusCode === 200 ? (
               <div>
                  <div className="py-8 min-h-[350px]">
                     <img
                        src={data.poster}
                        alt={data.title}
                        title={data.title}
                        className="w-[200px] float-left mb-2 mr-7 mssm:w-screen mssm:h-auto"
                        onError={({ currentTarget }) => {
                           currentTarget.src = `${poster404}`;
                        }}
                     />
                     <p className="text-justify">{data.description}</p>
                  </div>
                  <Header
                     route="Details"
                     className="text-center font-semibold"
                  />
                  <div className="px-4 py-8">
                     {data.detailsList.map((item, index) => (
                        <div
                           key={index}
                           className="grid grid-cols-2 border-t-[1px] border-zinc-700"
                        >
                           <div className="p-3">
                              <p>{item.subTitle}</p>
                           </div>
                           <div className="p-3">
                              <p>{item.title}</p>
                           </div>
                        </div>
                     ))}
                     <div className="grid grid-cols-2 border-t-[1px] border-zinc-700">
                        <div className="p-3">
                           <p>Genres</p>
                        </div>
                        <div className="p-3 flex gap-4 flex-wrap">
                           {data.genres.map((item, index) => (
                              <Link
                                 to={`/genre/${item
                                    .replace(/\ /, "-")
                                    .toLowerCase()}`}
                                 key={index}
                                 className="genre-list"
                              >
                                 {item}
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
                  <Header
                     route="Nonton Anime"
                     secondMessage={`${data.title} sub Indo`}
                     className="text-center font-semibold"
                  />
                  <div className="px-4 py-8">
                     <ul className="max-h-80 overflow-auto">
                        {episodes &&
                           episodes.map((item) => (
                              <li
                                 key={item}
                                 className="p-2 border-t-[1px] border-zinc-700"
                              >
                                 <Link
                                    to={`/anime/${data.slugPlayer}/${item}`}
                                    className="hover:text-zinc-400 transition"
                                 >{`${data.title} episode ${item} sub indo`}</Link>
                              </li>
                           ))}
                     </ul>
                  </div>
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

export default AnimeDetails;
