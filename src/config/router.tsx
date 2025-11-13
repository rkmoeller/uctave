import { createBrowserRouter } from "react-router";
import Frontpage from "../Frontpage";
import Root from "../app/Root";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Frontpage,
  },
  {
    path: "/app",
    Component: Root,
  },
]);
