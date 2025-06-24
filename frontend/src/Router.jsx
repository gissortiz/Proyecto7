import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import ServiceDetail from "./pages/ServiceDetail";

const router = createBrowserRouter ([
{
    path: '/',
    element: <Layout/>,
    children: [
        { path: "/", element: (<ErrorBoundary> <Home/> </ErrorBoundary>) },
        { path: "/servicios", element: (<ErrorBoundary> <Services/> </ErrorBoundary>) },
        { path: "/about", element: (<ErrorBoundary> <About/> </ErrorBoundary>) },
        { path: "/Servicios/:id", element: (<ErrorBoundary> <ServiceDetail/> </ErrorBoundary>) },

    ]
}

])

export default router;