import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListContainerComponennt from "./components/ListContainerComponennt.tsx";
import HomeView, { loader as LoaderHome } from "./views/HomeView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeView />, loader: LoaderHome },
      { path: "/movie", element: <ListContainerComponennt /> },
      { path: "/tv-show", element: <ListContainerComponennt /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
