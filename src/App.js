import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Matches from "./components/Matches/Matches";
import { queryClient } from "./services/http";
import NewMatch from "./components/Matches/NewMatch";
import MatchDetails from "./components/Matches/MatchDetails";
import EditMatch from "./components/Matches/EditMatch";
import { loader as EditMatchLoader } from "./components/Matches/EditMatch";
import { action as EditMatchAction } from "./components/Matches/EditMatch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/matches" />,
  },
  {
    path: "/matches",
    element: <Matches />,
    children: [
      {
        path: "/matches/new",
        element: <NewMatch />,
      },
      {
        path: "/matches/:id",
        element: <MatchDetails />,
        children: [
          {
            path: "/matches/:id/edit",
            element: <EditMatch />,
            loader: EditMatchLoader,
            action: EditMatchAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
