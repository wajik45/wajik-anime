import { Link } from "react-router-dom";
import { MainDataInterface } from "../interfaces";
import { getPathName } from "../utils";

const Pagination = ({ data }: { data: MainDataInterface }) => {
   const firstPagination = (data: MainDataInterface) => {
      if (data.currentPage === 1) return data.currentPage;
      return data.currentPage - 1;
   };

   const secondPagination = (data: MainDataInterface) => {
      if (data.currentPage === 1) return data.currentPage + 1;
      return data.currentPage;
   };

   const thirdPagination = (data: MainDataInterface) => {
      if (data.currentPage === 1) return data.currentPage + 2;
      return data.currentPage + 1;
   };

   const pathName = getPathName();

   return (
      <div
         className={`py-6 flex justify-center gap-3 flex-wrap ${
            data.maxPage === 1 ? "hidden" : ""
         }`}
      >
         <Link
            to={`${pathName}?page=${data.currentPage - 1}`}
            className={`pagination-list ${
               data.currentPage <= 1 ? "hidden" : ""
            }`}
         >
            Prev
         </Link>
         <Link
            to={pathName}
            className={`pagination-list ${
               data.currentPage <= data.maxPage / 2 ? "hidden" : ""
            }`}
         >
            1
         </Link>
         <p
            className={`pagination-list ${
               data.currentPage <= data.maxPage / 2 ? "hidden" : ""
            }`}
         >
            ...
         </p>
         <Link
            to={`${pathName}?page=${firstPagination(data)}`}
            className={`pagination-list ring-zinc-400 ${
               data.currentPage === 1 ? "ring-2" : ""
            }`}
         >
            {firstPagination(data)}
         </Link>
         <Link
            to={`${pathName}?page=${secondPagination(data)}`}
            className={`pagination-list ring-zinc-400 ${
               data.currentPage === 1 ? "" : "ring-2"
            }`}
         >
            {secondPagination(data)}
         </Link>
         <Link
            to={`${pathName}?page=${thirdPagination(data)}`}
            className={`pagination-list ${
               data.currentPage === data.maxPage ? "hidden" : ""
            }`}
         >
            {thirdPagination(data)}
         </Link>
         <p
            className={`pagination-list ${
               data.currentPage >= data.maxPage / 2 ? "hidden" : ""
            }`}
         >
            ...
         </p>
         <Link
            to={`${pathName}?page=${data.maxPage}`}
            className={`pagination-list ${
               data.currentPage >= data.maxPage / 2 ? "hidden" : ""
            }`}
         >
            {data.maxPage}
         </Link>
         <Link
            to={`${pathName}?page=${data.currentPage + 1}`}
            className={`pagination-list ${
               data.currentPage >= data.maxPage - 1 ? "hidden" : ""
            }`}
         >
            Next
         </Link>
      </div>
   );
};

export default Pagination;
