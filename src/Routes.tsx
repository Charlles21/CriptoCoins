import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Detail } from "./pages/Detail/Detail";
import { NotFound } from "./pages/NotFound/NotFound";
import { LayoutPrincipal } from "./Components/Layout/LayoutPrincipal";


const HomeRoute: RouteObject = {path: '/', element: <Home/>}
const DetailRoute: RouteObject = {path:'/detail/:cripto', element: <Detail/>}
const NotFoundRoute: RouteObject = {path: '*', element: <NotFound/>}

const LayoutPrincipalRoute: RouteObject = {element: <LayoutPrincipal/>, children: [HomeRoute,DetailRoute,NotFoundRoute]}

const router = createBrowserRouter([LayoutPrincipalRoute])

export {router}