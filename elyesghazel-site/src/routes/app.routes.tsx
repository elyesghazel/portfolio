import type { RouteObject } from "react-router";

import HomePage from "../pages/home/page";

import Layout from "../components/layout/Layout";
import NotFound from "../pages/fallback/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFound />, // Fallback to NotFound for any unmatched routes
      },
    ],
  },
];

export default routes;
