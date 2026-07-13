import { createBrowserRouter } from 'react-router';
import HomePage from '../pages/HomePage/HomePage';
import VehiclePage from '../pages/VehiclePage/VehiclePage';
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/vehicles/:vehicleId',
        element: <VehiclePage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);