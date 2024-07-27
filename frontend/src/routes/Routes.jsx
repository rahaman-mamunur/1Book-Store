import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Admin from "../pages/Admin"
import AdminHome from "../pages/AdminHome/AdminHome"
import AllUsers from "../pages/AllUsers"
import Book from "../pages/Book/Book"
import Carts from "../pages/Carts/Carts"
import CreateBook from "../pages/CreateBook"
import Dashboard from "../pages/Dashboard"
import DeleteBook from "../pages/DeleteBook"
import EditBooks from "../pages/EditBook"
import Login from "../pages/Login/Login"
import Order from "../pages/Order/Order"
import Payment from "../pages/Payment/Payment"
import PaymentHistory from "../pages/Payment/PaymentHistory"
import SignUp from "../pages/Register/SignUp"
import ShowBook from "../pages/ShowBook"
import BookInfo from "../pages/User/BookInfo/BookInfo"
import Home from "../pages/User/Home/Home"
import UserHome from "../pages/UserHome/UserHome"
import PrivateRoute from "../routes/PrivateRoute"
import AdminRoute from "./AdminRoutes"

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main />,
        children : [

            {
                path : '/',
                element: <Home />
            },
            {
                path: '/userbooks',
                element: <Book />
            },
            {
                path: '/booksinfo/:id',
                element: <BookInfo />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            
        ]
    },
    {
        path: 'orders',
        element : <PrivateRoute><Order /></PrivateRoute>,
        children: [

            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },

            {
                path : 'cart',
                element : <PrivateRoute><Carts /></PrivateRoute>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            }
        ]

    },

    // admin routes 

    {
        path: 'admin' , 
        element : <AdminRoute><Admin /></AdminRoute>,
        children : [

            {
                path: 'adminHome',
                element: <AdminHome />
            },

            {
                path : 'dashboard',
                element : <AdminRoute><Dashboard></Dashboard></AdminRoute>,
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers /></AdminRoute>,
            },
            {
                path: 'books/create',
                element: <AdminRoute><CreateBook></CreateBook></AdminRoute>
            },
            {
                path: 'books/details/:id',
                element: <AdminRoute><ShowBook /></AdminRoute>
            },
            {
                path: 'books/edit/:id',
                element: <AdminRoute><EditBooks /></AdminRoute>
            },
            {
                path: 'books/delete/:id',
                element: <AdminRoute><DeleteBook /></AdminRoute>
            },

        ]
    }

 
    
])