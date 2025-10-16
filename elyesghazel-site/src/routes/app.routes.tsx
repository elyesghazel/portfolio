import type { RouteObject } from "react-router";

import HomePage from "../pages/home/page";

import Layout from "../components/layout/Layout";
import NotFound from "../pages/fallback/NotFound";
import ServicesPage from "../pages/services/page";
import ProjectsPage from "../pages/projects/page";
import RequestQuotePage from "@/pages/quote/page";

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
        path: "/projects",
        element: <ProjectsPage />
      },
      {
        path: "/quote",
        element: <RequestQuotePage />
      },
      {
        path: "*",
        element: <NotFound />, // Fallback to NotFound for any unmatched routes
      },
    ],
  },
];

export default routes;
