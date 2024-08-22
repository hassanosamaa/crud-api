import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Layout from "./Layout"
import { Provider } from "react-redux"
import { store } from "../src/redux/Store"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Details from "./pages/Details"


function App() {
  let router=createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"dashboard",element:<Dashboard/>},
      {path:":id",element:<Details/>}
    ]
  }])
  let query=new QueryClient()
  return (
    
    <Provider store={store}>
      <QueryClientProvider client={query}>
        <RouterProvider router={router}>
        </RouterProvider>
      </QueryClientProvider>
    </Provider>
    
  )
}

export default App
