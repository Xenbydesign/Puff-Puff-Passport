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
            <nav>
                <NavLink to="/cannaeducation" className="nav-link">
                    Cannabis 101
                </NavLink>
                {currentUser ? (
                    <>
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/cannagear" className="nav-link">
                            Canna Gear
                        </NavLink>
                        <NavLink to="/budtracker" className="nav-link">
                            Bud Tracker
                        </NavLink>
                        <NavLink to="/smokesession" className="nav-link">
                            Smoke Session
                        </NavLink>

                        <NavLink to="/user/settings" className="nav-link">
                            Settings
                        </NavLink>
                        <NavLink to="#" className="nav-link" onClick={handleDelete}>
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/registration" className="nav-link">
                            Registration
                        </NavLink>
                    </>
                )}
            </nav>
        </>
    );
};

export default Nav;