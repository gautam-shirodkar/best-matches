import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import "./App.css";
import Matches from "./components/Matches/Matches";
import { queryClient } from "./services/http";
import NewMatch from "./components/Matches/NewMatch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Matches />,
    children: [
      {
        path: "matches/new",
        element: <NewMatch />,
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
