import { useNavigate } from "react-router-dom";

type ComponentProps = {
   episodes: number[];
   slug: string | undefined;
};

const SelectEpisode = (props: ComponentProps) => {
   const { episodes, slug } = props;
   const navigate = useNavigate();

   const handleChange = (target: EventTarget & HTMLSelectElement) => {
      navigate(target.value);
   };

   return (
      <select
         onChange={({ target }) => handleChange(target)}
         id="select-episode"
         className="p-2 inline-block rounded-md bg-zinc-900 ring-2 ring-sky-800"
      >
         <option value="">Pilih Episode</option>
         {episodes.map((item, index) => (
            <option key={index} value={`/anime/${slug}/${item}`}>
               Episode {item}
            </option>
         ))}
      </select>
   );
};

export default SelectEpisode;
