import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

function Nav({ currentUser, updateCurrentUser }) {

    const handleDelete = () => {
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
            <nav className="navbar">
                <NavLink to="/cannaeducation" className="active-link">
                    Cannabis 101
                </NavLink>
                {currentUser ? (
                    <>
                        <NavLink to="/" className="active-link">
                            Home
                        </NavLink>
                        <NavLink to="/cannagear" className="active-link">
                            Canna Gear
                        </NavLink>
                        <NavLink to="/budtracker" className="active-link">
                            Bud Tracker
                        </NavLink>
                        <NavLink to="/smokesession" className="active-link">
                            Smoke Session
                        </NavLink>

                        <NavLink to="/profile" className="active-link">
                            Profile
                        </NavLink>
                        <NavLink to="#" className="active-link" onClick={handleDelete}>
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/registration" className="active-link">
                            Registration
                        </NavLink>
                    </>
                )}
            </nav>
        </>
    );
};

export default Nav;