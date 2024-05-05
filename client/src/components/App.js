import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from "./navigation/Nav";
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const updateCurrentUser = (user) => setCurrentUser(user)
  const [currentUser, setCurrentUser] = useState(null)
  const [strains, setStrains] = useState(null)

  useEffect(() => {
    fetch("/check-session")
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Server response was not ok.');
        }
      })
      .then(setCurrentUser)
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);


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
      <Nav currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
      <div><Toaster /></div>
      <Outlet context={{ currentUser, updateCurrentUser, strains }} />
    </>
  )
}

export default App;
