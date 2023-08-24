import React from "react";
import ReactDOM from "react-dom/client";
import Anime from "../src/pages/Anime";
import Movie from "../src/pages/Movie";
import Completed from "../src/pages/Completed";
import Genre from "../src/pages/Genre";
import Home from "../src/pages/Home";
import Ongoing from "../src/pages/Ongoing";
import GenreList from "../src/pages/GenreList";
import Search from "../src/pages/Search";
import AnimeDetails from "../src/pages/AnimeDetails";
import StreamingAnime from "../src/pages/StreamingAnime";
import StreamingMovie from "../src/pages/StreamingMovie";
import NotFound from "../src/pages/NotFound";
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
      element: <Completed />,
   },
   {
      path: "/genre",
      element: <GenreList />,
   },
   {
      path: "/genre/:slug",
      _element: <Genre />,
      get element() {
         return this._element;
      },
      set element(value) {
         this._element = value;
      },
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
