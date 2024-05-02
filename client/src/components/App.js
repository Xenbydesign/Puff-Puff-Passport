import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from "./navigation/Nav";
import toast, { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from "@react-oauth/google";
import Registration from "./auth/Registration";

function App() {
  const updateCurrentUser = (user) => setCurrentUser(user)
  const [currentUser, setCurrentUser] = useState(null)
  const [strains, setStrains] = useState(null)


  useEffect(() => {
    fetch("/check-session")
      .then(resp => {
        if (resp.ok) {
          resp.json()
            .then(setCurrentUser)
        }
      })
  }, [])


  useEffect(() => {
    fetch("/strains")
      .then(resp => {
        if (resp.ok) {
          return resp.json().then(setStrains)
        }
        return resp.json().then(errorObj => toast.error(errorObj.message))
      })
      .catch(err => console.log(err))
  }, []);





  return (
    <>
      <GoogleOAuthProvider clientId="REACT_APP_GOOGLE_CLIENT_ID">
        <Nav currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
        <div><Toaster /></div>
        <Outlet context={{ currentUser, updateCurrentUser, strains }} />
      </GoogleOAuthProvider>
    </>
  )
}

export default App;
