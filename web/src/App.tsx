import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes/__root";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
