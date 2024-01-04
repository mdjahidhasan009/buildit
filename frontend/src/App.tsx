import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from './components/Home'
import Projects from './components/Projects'
import Templates from './components/Templates'
import CreateDesign from "./components/CreateDesign.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
    element: <CreateDesign />,
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App