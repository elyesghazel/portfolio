import type { RouteObject } from "react-router";

import HomePage from "../pages/home/page";

import Layout from "../components/layout/Layout";
import NotFound from "../pages/fallback/NotFound";
import ServicesPage from "../pages/services/page";

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
        path: "/services",
        element: <ServicesPage />
      },
      {
        path: "*",
        element: <NotFound />, // Fallback to NotFound for any unmatched routes
      },
    ],
  },
];

export default routes;
