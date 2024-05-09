import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from 'react-router-dom'
import Nav from "./navigation/Nav";
import toast, { Toaster } from 'react-hot-toast'
import Logo from "../styles/logo.png"
import { fetchWithCSRF } from "./fetchWithCSRF";
import Footer from "../styles/footer";
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
      <Outlet context={{ currentUser, updateCurrentUser, strains }} />
      <hr id='footer' />
      <Footer />
    </>
  )
}

export default App;
