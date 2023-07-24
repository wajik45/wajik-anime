import { useEffect, useState } from "react";
import {
   Navbar,
   Footer,
   Header,
   SelectServer,
   DownloadLink,
   StreamingDescription,
   StreamingMain,
   Loader,
} from "../components";
import { Wrapper, Content } from "../layouts";
import { StreamingInterface } from "../interfaces";
import { useParams } from "react-router-dom";

const StreamingMovie = () => {
   const [data, setData] = useState<StreamingInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [videoLink, setVideoLink] = useState<string>("");
   const { slug } = useParams();

   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data: any = await fetch(
               `${import.meta.env.VITE_BASE_URL}/movie/${slug}`
            ).then((res) => res.json());
            setData(data);
            document.title = `Wajik Streaming | Movie: ${
               data ? data.title : ""
            }`;
            setIsLoading(false);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, []);

   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header
               route="🎦 Anime"
               message={data?.title ? `${data.title}` : ""}
            />
            {isLoading ? (
               <Loader />
            ) : data ? (
               data.statusCode === 200 ? (
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

export default StreamingMovie;
