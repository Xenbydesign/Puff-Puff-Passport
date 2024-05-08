import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from 'react-router-dom'
import Nav from "./navigation/Nav";
import toast, { Toaster } from 'react-hot-toast'
import Logo from "../styles/logo.png"
function App() {
  const updateCurrentUser = (user) => setCurrentUser(user)
  const [currentUser, setCurrentUser] = useState(null)
  const [strains, setStrains] = useState(null)
  const navigate = useNavigate()

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


  useEffect(() => {
    fetch("/me", {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
      },
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(updateCurrentUser)

        } else {
          fetch("/refresh", {
            method: "POST",
            headers: {
              'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
            }
          })
            .then(resp => {
              if (resp.ok) {
                resp.json().then(updateCurrentUser)
              } else {
                navigate("/login")
                toast.error("Please log in")
              }

            })
        }
      })
  }, [navigate]);

  const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
    'X-CSRF-RE-TOKEN': getCookie('csrf_refresh_token'),
  };


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
      <header>
        {currentUser ? <div className="header-wrapper">

          <div className="welcome"><h1>Welcome, {currentUser.username || 'User'}!</h1>
          </div>


          <div className="user-links">
            <Link to="#" className="app-link" onClick={handleLogout}>
              Logout
            </Link>
            <Link to="/user/settings" className="app-link">
              ⚙️
            </Link>
          </div>

        </div> : null}

        <Link to='/'><img src={Logo} alt='canna keeper logo' id='logo' /></Link>

        <Nav currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
      </header>
      <div><Toaster /></div>
      <Outlet context={{ currentUser, updateCurrentUser, strains, headers, getCookie }} />
    </>
  )
}

export default App;
