import React from "react";
import ReactDOM from "react-dom/client";
import {
   Home,
   Anime,
   Movie,
   Complete,
   Ongoing,
   Genre,
   GenreList,
   Search,
   AnimeDetails,
   StreamingAnime,
   StreamingMovie,
   NotFound,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/anime",
      element: <Anime />,
   },
   {
      path: "/movie",
      element: <Movie />,
   },
   {
      path: "/ongoing",
      element: <Ongoing />,
   },
   {
      path: "/complete",
      element: <Complete />,
   },
   {
      path: "/genre",
      element: <GenreList />,
   },
   {
      path: "/genre/:slug",
      element: <Genre />,
   },
   {
      path: "/search/:keyword",
      element: <Search />,
   },
   {
      path: "/anime/:slug",
      element: <AnimeDetails />,
   },
   {
      path: "/anime/:slug/:episode",
      element: <StreamingAnime />,
   },
   {
      path: "/movie/:slug",
      element: <StreamingMovie />,
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
