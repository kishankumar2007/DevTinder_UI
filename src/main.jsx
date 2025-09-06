import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Login, Signup, Profile, Feed } from "./index.js"
import AuthLayout from './Layout/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthLayout><Feed /></AuthLayout>
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/feed",
        element: (
          <AuthLayout>
            <Feed />
          </AuthLayout>
        ),
      },


      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
)
