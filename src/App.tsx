import React from "react";
import "./tailwind-dist.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, routes } from "./routes";
import { PrivateRoute } from "./components/privateRoute";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function App() {
  const router = createBrowserRouter(
    routes.map((route: Route) => ({
      path: route.path,
      element: <PrivateRoute route={route} />,
    }))
  );

  // Create a client
  const queryClient = new QueryClient();

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
