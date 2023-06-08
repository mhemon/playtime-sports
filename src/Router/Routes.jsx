import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Instructors from "../Page/Instructors/Instructors";
import Login from "../Page/Login/Login";
import Signup from "../Page/Signup/Signup";
import InstructorHome from "../Page/InstructorHome/InstructorHome";
import Dashboard from "./Dashboard";
import SelectedClasses from "../Page/SelectedClasses/SelectedClasses";
import AdminHome from "../Page/AdminHome/AdminHome";

export const router = createBrowserRouter(
  [
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
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
    },
    {
      path: 'dashboard',
      element: <Dashboard/>,
      children: [
        {
          path: 'adminhome',
          element: <AdminHome/>
        },
        {
          path: 'instructorhome',
          element: <InstructorHome/>
        },
        {
          path: 'selected-classes',
          element: <SelectedClasses/>
        }
    ]
    }
  ]);