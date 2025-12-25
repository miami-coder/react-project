import {createBrowserRouter, Navigate} from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import {MoviesPage} from "../pages/moviePage/MoviesPage.tsx";
import {MovieDetailsPage} from "../pages/movieDetailPage/MovieDetailsPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={'movies'} replace />
            },
            {
                path: 'movies',
                element: <MoviesPage />
            },
            {
                path: 'movies/:id',
                element: <MovieDetailsPage />
            }
        ]
    }
])