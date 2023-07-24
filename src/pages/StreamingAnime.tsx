import { useEffect, useRef, useState } from "react";
import {
   Navbar,
   Footer,
   Header,
   SelectServer,
   SelectEpisode,
   DownloadLink,
   StreamingDescription,
   StreamingMain,
   Loader,
} from "../components";
import { Wrapper, Content } from "../layouts";
import { StreamingInterface } from "../interfaces";
import { useParams } from "react-router-dom";

const StreamingAnime = () => {
   const [data, setData] = useState<StreamingInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [videoLink, setVideoLink] = useState<string>("");
   const { slug, episode } = useParams();
   const selectServer = useRef<HTMLSelectElement>(null);

   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data: any = await fetch(
               `${import.meta.env.VITE_BASE_URL}/anime/${slug}/${episode}`
            ).then((res) => res.json());
            setData(data);
            document.title = `Wajik Streaming | Anime: ${
               data ? data.title : ""
            } | Episode ${data ? episode : ""}`;
            setIsLoading(false);
            scrollTo({
               top: 0,
               behavior: "instant",
            });
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [episode]);

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
      <Wrapper>
         <Navbar />
         <Content>
            <Header
               route="🎦 Anime"
               message={data?.title ? `${data.title} > Eps ${episode}` : ""}
            />
            {isLoading ? (
               <Loader />
            ) : data ? (
               data.statusCode === 200 ? (
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

export default StreamingAnime;
