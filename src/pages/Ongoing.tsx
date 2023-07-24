import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Card } from "../components";
import { Wrapper, Content } from "../layouts";
import { MainDataInterface } from "../interfaces";
import { getQuery } from "../utils";

const Ongoing = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const page = getQuery("page");
   useEffect(() => {
      setIsLoading(true);
      (async () => {
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/ongoing?page=${
                  page ? page : 1
               }`
            ).then((res) => res.json());
            setData(data);
            setIsLoading(false);
         } catch (err) {
            setIsLoading(false);
         }
      })();
      document.title = "Wajik Streaming | Ongoing";
   }, [page]);
   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header route="🏃‍♂️💨 Ongoing" message="terbaru" />
            <Card data={data} isLoading={isLoading} />
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default Ongoing;
