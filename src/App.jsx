import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Events } from "./pages/Events";
import { Outlets } from "./pages/Outlets";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Blog } from "./pages/Blog";
import { Recipes } from "./pages/Recipes";
import { FAQ } from "./pages/FAQ";
import { Careers } from "./pages/Careers";
import { Terms } from "./pages/Terms";
import { ErrorPage } from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Menu",
        element: <Menu />,
      },
      {
        path: "Events",
        element: <Events />,
      },
      {
        path: "Outlets",
        element: <Outlets />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Blog",
        element: <Blog />,
      },
      {
        path: "Recipes",
        element: <Recipes />,
      },
      {
        path: "FAQ",
        element: <FAQ />,
      },
      {
        path: "Careers",
        element: <Careers />,
      },
      {
        path: "Terms",
        element: <Terms />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
