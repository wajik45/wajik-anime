import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Loader } from "../components";
import { Wrapper, Content } from "../layouts";
import { AnimeDetailsInterface } from "../interfaces";
import { Link, useParams } from "react-router-dom";
import poster404 from "../assets/poster-404/poster-404.jpg";

const AnimeDetails = () => {
   const [data, setData] = useState<AnimeDetailsInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const { slug } = useParams();
   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/anime/${slug}`
            ).then((res) => res.json());
            setData(data);
            document.title = `Wajik Streaming | Anime: ${
               data ? data.title : ""
            }`;
            setIsLoading(false);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, []);

   const episodes: number[] = [];

   if (data) {
      for (let i = 0; i < data.currentTotalEpisodes; i++) {
         episodes.push(i + 1);
      }
   }

   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header route="🎦 Anime" message={data?.title ? data.title : ""} />
            {isLoading ? (
               <Loader />
            ) : data ? (
               data.statusCode === 200 ? (
                  <div>
                     <Header
                        route="Anime"
                        secondMessage={data.title}
                        className="text-center font-semibold"
                     />
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
                                    className="inline-block ring-2 ring-zinc-300 hover:ring-emerald-500 hover:text-zinc-400 transition px-3 py-1 rounded-full"
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
               )
            ) : (
               error && (
                  <h1 className="text-center text-2xl py-4">{error.message}</h1>
               )
            )}
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default AnimeDetails;
