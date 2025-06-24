import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import ServiceDetail from "./pages/ServiceDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter ([
{
    path: '/',
    element: <Layout/>,
    children: [
        { path: "/", element: (<ErrorBoundary> <Home/> </ErrorBoundary>) },
        { path: "/servicios", element: (<ErrorBoundary> <Services/> </ErrorBoundary>) },
        { path: "/about", element: (<ErrorBoundary> <About/> </ErrorBoundary>) },
        { path: "/servicios/:id", element: (<ErrorBoundary> <ServiceDetail/> </ErrorBoundary>) },
        { path: "/profile", element: (<ErrorBoundary> <Profile/> </ErrorBoundary>) },
        { path: "/login", element: (<ErrorBoundary> <Login/> </ErrorBoundary>) },
        { path: "/signup", element: (<ErrorBoundary> <Signup/> </ErrorBoundary>) },
    ]
}
])

export default router;