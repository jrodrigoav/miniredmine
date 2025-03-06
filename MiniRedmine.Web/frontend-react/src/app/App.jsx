import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { UserProvider } from "./providers/User";
import { NavigationComponent } from "./components/Navigation";
import { HomePage } from "./pages/Home";
import { TimeEntriesPage } from "./pages/TimeEntries";
import { ConfigurationPage } from "./pages/Configuration";
import { LoginPage } from './pages/Login';

const createAppRouter = () => createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "timeentries",
                element: <TimeEntriesPage />
            },
            {
                path: "configuration",
                element: <ConfigurationPage />
            }
        ]
    }
]);

function Layout() {
    return (
        <div className="container-fluid">
            <NavigationComponent />
            <Outlet />
        </div>
    );
}

export function App() {
    const router = useMemo(() => createAppRouter(), []);
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

