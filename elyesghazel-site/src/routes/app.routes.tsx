import type { RouteObject } from "react-router";

import HomePage from "../pages/home/page";

import Layout from "../components/layout/Layout";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
];

export default routes;
