import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import Home from '../components/pages/Home'
import Error from '../components/helpers/Error'
import Registration from '../components/auth/Registration'
import CannaGear from '../components/CannaGear/CannaGear'
import BudTracker from '../components/BudTracker/BudTracker'
import SmokeSession from '../components/pages/SmokeSession'
import UserSettings from '../components/pages/UserSettings'
import CannaEd from '../components/pages/CannaEd'
import BudDetails from '../components/BudTracker/BudDetails'
import BudTrackerForm from '../components/BudTracker/BudTrackerForm'
import CannaGearForm from '../components/CannaGear/CannaGearForm'

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
                path: "cannagear/edit/:gearId",
                element: <CannaGearForm />
            },
            {
                path: "cannagear/new",
                element: <CannaGearForm />
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
                path: "user/settings",
                element: <UserSettings />
            },
            {
                path: "cannaeducation",
                element: <CannaEd />
            }
        ]
    }
])