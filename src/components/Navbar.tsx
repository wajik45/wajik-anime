import * as React from "react";
import { useState } from "react";
import { Container } from "../layouts";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setClickCount }: { setClickCount?: any }) => {
   const [search, setSearch] = useState<string>("");
   const navigate = useNavigate();

   const handleChange = (target: EventTarget & HTMLInputElement) => {
      setSearch(target.value);
   };
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (search !== "") {
         return (location.href = `/search/${search}`);
      }
   };
   const handleClickSearch = () => {
      if (search !== "") {
         return navigate(`/search/${search}`);
      }
   };
   const handleClickCount = () => {
      setClickCount((prev: number) => prev + 1);
   };

   return (
      <div id="navbar" className="bg-zinc-900">
         <Container>
            <nav>
               <div className="flex justify-between items-center flex-wrap mmd:block">
                  <div className="brand py-4">
                     <a href="/" className="font-bold text-2xl">
                        Wajik Streaming
                     </a>
                  </div>
                  <form
                     onSubmit={(e) => handleSubmit(e)}
                     className="relative flex items-center py-4"
                  >
                     <input
                        onChange={({ target }) => handleChange(target)}
                        type="text"
                        placeholder="Cari anime..."
                        className="px-3 py-2 rounded-md ring-1 ring-zinc-200 focus:ring-2 mmd:w-full"
                     />
                     <div
                        onClick={() => handleClickSearch()}
                        className="absolute right-0 mx-1 text-xl cursor-pointer"
                     >
                        🔍
                     </div>
                  </form>
               </div>
               <div>
                  <ul className="grid grid-cols-8 gap-4 mlg:grid-cols-6 mmd:grid-cols-4 mssm:grid-cols-2 mxsm:grid-cols-1 py-4">
                     <li>
                        <Link
                           onClick={() => handleClickCount()}
                           to="/"
                           className="navbar-list"
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           onClick={() => handleClickCount()}
                           to="/ongoing"
                           className="navbar-list"
                        >
                           Ongoing
                        </Link>
                     </li>
                     <li>
                        <Link
                           onClick={() => handleClickCount()}
                           to="/complete"
                           className="navbar-list"
                        >
                           Complete
                        </Link>
                     </li>
                     <li>
                        <Link
                           onClick={() => handleClickCount()}
                           to="/anime"
                           className="navbar-list"
                        >
                           Anime
                        </Link>
                     </li>
                     <li>
                        <Link
                           onClick={() => handleClickCount()}
                           to="/movie"
                           className="navbar-list"
                        >
                           Movie
                        </Link>
                     </li>
                     <li>
                        <Link
                           onClick={() => handleClickCount()}
                           to="/genre"
                           className="navbar-list"
                        >
                           Genre
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h1 className="py-6 text-2xl font-semibold text-center msm:text-xl">
                     NONTON GRATIS GAPAKE KARCIS
                  </h1>
               </div>
            </nav>
         </Container>
      </div>
   );
};

export default Navbar;
