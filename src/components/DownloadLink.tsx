import { Header } from ".";
import { StreamingInterface } from "../interfaces";

const DownloadLink = ({ data }: { data: StreamingInterface }) => {
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
                  className="download-list"
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
