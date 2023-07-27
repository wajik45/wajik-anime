import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Card } from "../components";
import { Wrapper, Content } from "../layouts";
import { MainDataInterface } from "../interfaces";
import { getQuery } from "../utils";

const Ongoing = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [clickCount, setClickCount] = useState<number>(0);
   const [error, setError] = useState<any>(null);
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
            setError(err);
         }
      })();
      document.title = "Wajik Streaming | Ongoing";
   }, [page, clickCount]);
   return (
      <Wrapper>
         <Navbar setClickCount={setClickCount} />
         <Content>
            <Header route="🏃‍♂️💨 Ongoing" message="terbaru" />
            <Card data={data} isLoading={isLoading} error={error} />
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default Ongoing;
