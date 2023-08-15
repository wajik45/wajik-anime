import { MainDataInterface } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Pagination } from ".";
import poster404 from "../assets/poster-404/poster-404.jpg";

type ComponentProps = {
   data: MainDataInterface | null;
   isLoading: boolean;
   error: any;
   keyword?: string | undefined;
};

const Card = (props: ComponentProps) => {
   const { data, isLoading, error, keyword } = props;
   const navigate = useNavigate();

   const handleNavigate = (item: any) => {
      return navigate(
         `/${
            item.type?.includes("Movie")
               ? "movie"
               : item.type?.includes("Chapter")
               ? ""
               : "anime"
         }/${item.slug}`
      );
   };

   if (isLoading) {
      return <Loader />;
   }

   if (error) {
      return <h1 className="text-center text-2xl py-4">{error.message}</h1>;
   }

   if (data) {
      if (data.statusCode === 200) {
         return (
            <>
               <div className="grid gap-4 grid-cols-6 m2xl:grid-cols-4 mlg:grid-cols-3 msm:grid-cols-2 mxsm:grid-cols-1">
                  {data.list.map((item, index) => (
                     <div key={index} className="card group">
                        <img
                           onClick={() => handleNavigate(item)}
                           src={item.poster}
                           onError={({ currentTarget }) => {
                              currentTarget.src = `${poster404}`;
                           }}
                           alt={item.title}
                           title={item.title}
                           className="card-image"
                        />
                        <div
                           onClick={() => handleNavigate(item)}
                           className="card-play-icon"
                           style={{ top: "calc(50% - 32px)" }}
                        >
                           ▶
                        </div>
                        <div className="w-full absolute bottom-0 h-[20%] p-2 mssm:py-0 mxsm:py-2">
                           <Link
                              to={
                                 item.type?.includes("Movie")
                                    ? `/movie/${item.slug}`
                                    : item.type?.includes("Chapter")
                                    ? "/"
                                    : `/anime/${item.slug}`
                              }
                              className="card-link"
                           >
                              {item.title.slice(0, 35)}
                              {item.title.length > 35 ? "..." : ""}
                           </Link>
                        </div>
                        <div className="card-star">
                           <p className="font-semibold text-[.9rem]">
                              ⭐ {item.star}
                           </p>
                        </div>
                        <div className="card-type">
                           <p className="font-semibold text-[.9rem]">
                              {item.type ? item.type : item.episode}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
               <Pagination data={data} />
            </>
         );
      }
      return (
         <h1 className="text-center text-2xl py-4">
            {keyword ? keyword : ""} {data.error} {data.statusCode}{" "}
            {data.message}
         </h1>
      );
   }
};

export default Card;
