import { StreamingInterface } from "../interfaces";

type ComponentProps = {
   data: StreamingInterface;
   videoLink: string;
};

const StreamingMain = (props: ComponentProps) => {
   const { data, videoLink } = props;
   return (
      <div className="py-4 grid grid-cols-1 justify-items-center place-items-center rounded-md">
         <h3 className="absolute text-3xl">Bentar Bang.. !</h3>
         <iframe
            src={videoLink === "" ? data.videoPlayer[0]?.url || "" : videoLink}
            allowFullScreen
            className="aspect-video w-full rounded-md relative"
         ></iframe>
      </div>
   );
};

export default StreamingMain;
