import { Link } from "react-router-dom";
import { Header } from ".";
import { StreamingInterface } from "../interfaces";
import poster404 from "../assets/poster-404/poster-404.jpg";

const StreamingDescription = ({ data }: { data: StreamingInterface }) => {
   return (
      <>
         <Header
            route="Anime"
            secondMessage={data.title}
            className="text-center font-semibold"
         />
         <div className="py-8 min-h-[350px]">
            <img
               src={data.poster}
               alt={data.title}
               title={data.title}
               className="w-[200px] float-left mb-2 mr-7 mssm:w-screen mssm:h-auto"
               onError={({ currentTarget }) => {
                  currentTarget.src = `${poster404}`;
               }}
            />
            <p className="text-justify">{data.description}</p>
            <div className="py-4 flex gap-4">
               <Link
                  to={`/${
                     data.status === "Tamat"
                        ? "complete"
                        : data.status.toLowerCase()
                  }`}
                  className="streaming-description"
               >
                  {data.status}
               </Link>
               <Link to={`/`} className="streaming-description">
                  {data.year}
               </Link>
               <Link
                  to={`/${data.type.toLowerCase()}`}
                  className="streaming-description"
               >
                  {data.type}
               </Link>
            </div>
         </div>
      </>
   );
};

export default StreamingDescription;
