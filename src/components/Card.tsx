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

   return isLoading ? (
      <Loader />
   ) : data ? (
      data.statusCode === 200 ? (
         <>
            <div className="grid gap-4 grid-cols-6 mxl:grid-cols-4 mlg:grid-cols-3 msm:grid-cols-2 mxsm:grid-cols-1">
               {data.list.map((item, index) => (
                  <div
                     key={index}
                     className="aspect-[9/16] flex justify-center relative bg-gradient-to-t from-zinc-700 to-zinc-900 rounded-md mb-4 overflow-hidden group"
                  >
                     <img
                        onClick={() => handleNavigate(item)}
                        src={item.poster}
                        onError={({ currentTarget }) => {
                           currentTarget.src = `${poster404}`;
                        }}
                        alt={item.title}
                        title={item.title}
                        className="w-[94%] h-[80%] absolute rounded-md cursor-pointer group-hover:brightness-50 transition"
                     />
                     <div
                        onClick={() => handleNavigate(item)}
                        className="play-icon absolute text-2xl hidden cursor-pointer hover:block group-hover:block"
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
                           className="text-ellipsis font-semibold mssm:text-[.9rem] mxsm:text-base hover:text-zinc-400 transition"
                        >
                           {item.title.slice(0, 35)}
                           {item.title.length > 35 ? "..." : ""}
                        </Link>
                     </div>
                     <div className="absolute top-0 left-0 bg-sky-700 bg-opacity-90 text-zinc-200 p-1 rounded-md">
                        <p className="font-semibold text-[.9rem]">
                           ⭐ {item.star}
                        </p>
                     </div>
                     <div className="absolute top-0 right-0 bg-yellow-700 bg-opacity-90 text-zinc-200 p-1 rounded-md">
                        <p className="font-semibold text-[.9rem]">
                           {item.type ? item.type : item.episode}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
            <Pagination data={data} />
         </>
      ) : (
         <h1 className="text-center text-2xl py-4">
            {keyword ? keyword : ""} {data.error} {data.statusCode}{" "}
            {data.message}
         </h1>
      )
   ) : (
      error && <h1 className="text-center text-2xl py-4">{error.message}</h1>
   );
};

export default Card;
