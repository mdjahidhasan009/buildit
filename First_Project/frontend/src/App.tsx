import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from './components/Home'
import Projects from './components/Projects'
import Templates from './components/Templates'
import CreateDesign from "./components/CreateDesign.tsx";
import Main from "./pages/Main.tsx";
import Index from "./pages/Index.tsx";
import {tokenDecode} from "./utils";

const userInfo = tokenDecode(localStorage.getItem('buildit-token'));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout/> : <Index />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/templates',
        element: <Templates />
      },
      {
        path: '/projects',
        element: <Projects />
      }
    ]
  },
  {
    path: "/design/create",
    element: userInfo ? <CreateDesign /> : <Navigate to='/' />,
  },
  {
    path: "/design/:design_id/edit",
    element: userInfo ? <Main /> : <Navigate to='/' />,
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App