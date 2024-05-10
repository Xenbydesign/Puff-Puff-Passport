import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from 'react-router-dom'
import Nav from "./navigation/Nav";
import toast, { Toaster } from 'react-hot-toast'
import Logo from "../styles/logo.png"
import { fetchWithCSRF } from "./fetchWithCSRF";
import Footer from "../styles/footer";
import Header from "../styles/header";

function App() {
  const updateCurrentUser = (user) => setCurrentUser(user)
  const [currentUser, setCurrentUser] = useState(null)
  const [strains, setStrains] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    // Example usage for fetching user data
    fetchWithCSRF('/me')
      .then(response => response.json())
      .then(data => {
        setCurrentUser(data);
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    fetchWithCSRF("/strains")
      .then(resp => {
        if (resp.ok) {
          return resp.json().then(setStrains)
        }
        return resp.json().then(errorObj => toast.error(errorObj.message))
      })
      .catch(err => console.log(err))
  }, []);

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(resp => {
        if (resp.status === 204) {
          updateCurrentUser(null)
        }
      })
      .catch(err => console.log(err))
  }


  return (
    <>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <Toaster />
      <Outlet context={{ currentUser, updateCurrentUser: setCurrentUser, strains }} />
      <hr id='footer' />
      <Footer />
    </>
  )
}

export default App;
