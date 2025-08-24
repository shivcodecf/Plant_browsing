import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ui/Layout.jsx";
import Catalog from "./pages/CatalogPage.jsx";

import AddPlant from "./pages/AddPlantPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Catalog /> },

      { path: "/admin/add-plant", element: <AddPlant /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
