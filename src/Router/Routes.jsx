import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>
    },
  ]);