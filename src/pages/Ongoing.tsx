import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { getQuery, online } from "../utils";

const Ongoing = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const top = useRef<HTMLSpanElement>(null);
   const page = getQuery("page");

   const URL = `${import.meta.env.VITE_BASE_URL}/ongoing?page=${page || 1}`;

   useEffect(() => {
      scrollTo({
         top: top.current?.offsetTop,
         left: 0,
         behavior: "smooth",
      });

      document.title = "Wajik Streaming | Ongoing";
      online(setRefresh, setError);
      setIsLoading(true);

      (async () => {
         try {
            const response = await fetch(URL);
            const result = await response.json();

            setIsLoading(false);
            setData(result);
         } catch (err) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [page, refresh]);

   return (
      <MainLayout>
         <span ref={top}></span>
         <Header route="🏃‍♂️💨 Ongoing" message="terbaru" />
         <Card data={data} isLoading={isLoading} error={error} />
      </MainLayout>
   );
};

export default Ongoing;
