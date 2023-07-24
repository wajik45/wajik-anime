import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Card } from "../components";
import { Wrapper, Content } from "../layouts";
import { MainDataInterface } from "../interfaces";
import { getQuery } from "../utils";
import { useParams } from "react-router-dom";

const Genre = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const page = getQuery("page");
   const { slug } = useParams();
   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/genre/${slug}?page=${
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
      document.title = `Wajik Streaming | Genre: ${
         slug
            ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")
            : ""
      }`;
   }, [page]);
   return (
      <Wrapper>
         <Navbar />
         <Content>
            <Header
               route="📑 Genre"
               message={
                  slug?.charAt(0).toUpperCase() +
                  "" +
                  slug?.slice(1).replace("-", " ")
               }
            />
            <Card data={data} isLoading={isLoading} error={error} />
         </Content>
         <Footer />
      </Wrapper>
   );
};

export default Genre;
