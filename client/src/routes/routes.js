import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import Home from '../components/pages/Home'
import Error from '../components/errors/Error'
import Registration from '../components/auth/Registration'
import CannaGear from '../components/CannaGear/CannaGear'
import BudTracker from '../components/BudTracker/BudTracker'
import SmokeSession from '../components/pages/SmokeSession'
import UserProfile from '../components/pages/UserProfile'
import CannaEd from '../components/pages/CannaEd'
import BudDetails from '../components/BudTracker/BudDetails'
import BudTrackerForm from '../components/BudTracker/BudTrackerForm'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                index: true,
                element: <Home />
            },
            {
                path: "registration",
                element: <Registration />
            },
            {
                path: "login",
                element: <Registration />
            },
            {
                path: "cannagear",
                element: <CannaGear />
            },
            {
                path: "cannagear/:gearId",
                element: <CannaGear />
            },
            {
                path: "budtracker",
                element: <BudTracker />
            },
            {
                path: "budtracker/new/:strainId",
                element: <BudTrackerForm />
            },
            {
                path: "budtracker/edit/:budId",
                element: <BudTrackerForm />
            },
            {
                path: "budtracker/:budId",
                element: <BudDetails />
            },
            {
                path: "smokesession",
                element: <SmokeSession />
            },
            {
                path: "profile",
                element: <UserProfile />
            },
            {
                path: "cannaeducation",
                element: <CannaEd />
            }
        ]
    }
])