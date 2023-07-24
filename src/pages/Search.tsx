import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Card } from "../components";
import { Wrapper, Content } from "../layouts";
import { MainDataInterface } from "../interfaces";
import { getQuery } from "../utils";
import { useParams } from "react-router-dom";

const Search = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const { keyword } = useParams();
   const page = getQuery("page");

   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/search/${keyword}?page=${
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
      document.title = `Wajik Streaming | Search: ${keyword}`;
      document.querySelector("form")?.reset();
   }, [page, keyword]);

   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header route="🔎 Search" message={keyword} />
            <Card
               data={data}
               isLoading={isLoading}
               keyword={keyword}
               error={error}
            />
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default Search;
