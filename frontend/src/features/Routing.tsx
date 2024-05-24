import { RouteObject, useRoutes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Transportation } from "./Transportation theory/Transportation";
import { CpmForm } from "./CPM/CpmForm";
import { ErrorPage } from "./error/ErrorPage";

const routs: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/transport',
                element: <Transportation />

            },
            {
                path: '/CPM/new',
                element: <CpmForm />
            },
            {
                path: '/CPM/:id',
                element: <CpmForm />
            },
            {
                path: '*',
                element: <ErrorPage />
            }
        ]
    }

]

export const Routing = () => {
    return useRoutes(routs);
}