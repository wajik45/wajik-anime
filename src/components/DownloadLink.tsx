import { Header } from ".";
import { StreamingInterface } from "../interfaces";

type ComponentProps = {
   data: StreamingInterface;
};

const DownloadLink = ({ data }: ComponentProps) => {
   return (
      <>
         <Header
            route="Link download Anime"
            secondMessage={data.title}
            className="text-center font-semibold"
         />
         <div className="py-8 grid grid-cols-5 gap-6 mxl:grid-cols-4 mlg:grid-cols-3 mmd:grid-cols-2 mssm:grid-cols-1">
            {data.downloadLink.map((item, index) => (
               <a
                  key={index}
                  href={item.url}
                  className="ring-2 ring-teal-500 hover:ring-teal-700 hover:text-zinc-400 transition py-3 px-4 rounded-full font-semibold inline-block w-full text-center"
                  target="_blank"
               >
                  {item.server} {item.quality}
               </a>
            ))}
         </div>
      </>
   );
};

export default DownloadLink;
