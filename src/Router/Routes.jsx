import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Instructors from "../Page/Instructors/Instructors";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [{
        path: '/',
        element: <Home/>
      },
      {
        path: '/instructors',
        element: <Instructors/>
      }
    ]
    },
  ]);