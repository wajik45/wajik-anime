import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Card } from "../components";
import { Wrapper, Content } from "../layouts";
import { MainDataInterface } from "../interfaces";
import { getQuery } from "../utils";

const Movie = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const page = getQuery("page");
   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/movie?page=${page ? page : 1}`
            ).then((res) => res.json());
            setData(data);
            setIsLoading(false);
         } catch (err) {
            setIsLoading(false);
         }
      })();
      document.title = "Wajik Streaming | Movie";
   }, [page]);

   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header route="🎥 Movie" message="terbaru" />
            <Card data={data} isLoading={isLoading} />
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default Movie;
