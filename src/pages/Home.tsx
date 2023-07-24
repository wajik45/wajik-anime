import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Card } from "../components";
import { Wrapper, Content } from "../layouts";
import { MainDataInterface } from "../interfaces";
import { getQuery } from "../utils";

const Home = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const page = getQuery("page");

   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/home?page=${page ? page : 1}`
            ).then((res) => res.json());
            setData(data);
            setIsLoading(false);
         } catch (err: any) {
            setIsLoading(false);
            setError(err);
         }
      })();
      document.title = "Wajik Streaming";
   }, [page]);

   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header route="🏠 Home" message="terbaru" />
            <Card data={data} isLoading={isLoading} error={error} />
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default Home;
