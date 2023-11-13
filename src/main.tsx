import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView, { loader as LoaderHome } from "./views/HomeView.tsx";
import MovieView from "./views/MovieView.tsx";
import TVShowView from "./views/TVShowView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeView />, loader: LoaderHome },
      { path: "/movie", element: <MovieView/> },
      { path: "/tv-show", element: <TVShowView/>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
