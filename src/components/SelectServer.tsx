import { StreamingInterface } from "../interfaces";

type ComponentProps = {
   data: StreamingInterface;
   setVideoLink: any;
   selectServer?: any;
};

const SelectServer = (props: ComponentProps) => {
   const { data, setVideoLink, selectServer } = props;
   const handleChange = (target: EventTarget & HTMLSelectElement) => {
      setVideoLink(target.value);
   };
   return (
      <select
         ref={selectServer}
         onChange={({ target }) => handleChange(target)}
         id="select-episode"
         className="p-2 inline-block rounded-md bg-zinc-900 ring-2 ring-sky-800"
      >
         <option value="">Server & Kualitas</option>
         {data.videoPlayer.map((item, index) => (
            <option key={index} value={item.url}>
               {item.server} {item.quality}
            </option>
         ))}
      </select>
   );
};

export default SelectServer;
