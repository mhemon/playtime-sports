import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Instructors from "../Page/Instructors/Instructors";
import Login from "../Page/Login/Login";
import Signup from "../Page/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import SelectedClasses from "../Page/SelectedClasses/SelectedClasses";
import Classes from "../Page/Classes/Classes";
import Payment from "../Components/Payment/Payment";
import PaymentHistory from "../Page/PaymentHistory/PaymentHistory";
import EnrolledClasses from "../Page/EnrolledClasses/EnrolledClasses";
import ManageClasses from "../Page/ManageClasses/ManageClasses";
import ManageUsers from "../Page/ManageUsers/ManageUsers";
import MyClasses from "../Page/MyClasses/MyClasses";
import AddClasses from "../Page/AddClasses/AddClasses";
import ErrorPage from "../Components/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [{
        path: '/',
        element: <Home/>
      },
      {
        path: '/instructors',
        element: <Instructors/>
      },
      {
        path: '/classes',
        element: <Classes/>
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
      element: <PrivateRoutes><Dashboard/></PrivateRoutes>,
      children: [
        {
          path: 'manage-classes',
          element: <AdminRoute><ManageClasses/></AdminRoute>
        },
        {
          path: 'manage-users',
          element: <AdminRoute><ManageUsers/></AdminRoute>
        },
        {
          path: 'my-classes',
          element: <InstructorRoute><MyClasses/></InstructorRoute>
        },
        {
          path: 'add-classes',
          element: <InstructorRoute><AddClasses/></InstructorRoute>
        },
        {
          path: 'selected-classes',
          element: <SelectedClasses/>
        },
        {
          path: 'payment',
          element: <Payment/>
        },
        {
          path: 'payment-history',
          element: <PaymentHistory/>
        },
        {
          path: 'enrolled-classes',
          element: <EnrolledClasses/>
        }
    ]
    }
  ]);