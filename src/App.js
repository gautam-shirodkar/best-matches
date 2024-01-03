import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import "./App.css";
import Matches from "./components/Matches/Matches";
import { queryClient } from "./services/http";

const router = createBrowserRouter([{ path: "/", element: <Matches /> }]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
