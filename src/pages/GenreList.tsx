import { useEffect, useState } from "react";
import { Navbar, Footer, Header, Loader } from "../components";
import { Wrapper, Content } from "../layouts";
import { GenreListInterface } from "../interfaces";
import { Link } from "react-router-dom";

const GenreList = () => {
   const [data, setData] = useState<GenreListInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [clickCount, setClickCount] = useState<number>(0);
   const [error, setError] = useState<any>(null);
   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const data = await fetch(
               `${import.meta.env.VITE_BASE_URL}/genre`
            ).then((res) => res.json());
            setData(data);
            setIsLoading(false);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
      document.title = "Wajik Streaming | Genre";
   }, [clickCount]);

   return (
      <Wrapper>
         <Navbar setClickCount={setClickCount} />
         <Content>
            <Header route="📑 Genre" />
            {isLoading ? (
               <Loader />
            ) : data ? (
               data.statusCode === 200 ? (
                  <div className="grid gap-4 grid-cols-6 mxl:grid-cols-4 mlg:grid-cols-3 msm:grid-cols-2 mxsm:grid-cols-1">
                     {data?.list.map((item, index) => (
                        <Link
                           key={index}
                           to={`/genre/${item.slug}`}
                           className="w-full bg-zinc-700 p-4 rounded-md hover:ring-2 hover:ring-emerald-500 transition"
                        >
                           {item.title}
                        </Link>
                     ))}
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

export default GenreList;
