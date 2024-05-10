import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

function Nav({ currentUser }) {



    return (
        <>
            <nav>
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
                        {/* <NavLink to="/smokesession" className="nav-link">
                            Smoke Session
                        </NavLink> */}
                    </>
                ) : (
                    <>
                        <NavLink to="/registration" className="nav-link">
                            Login
                        </NavLink>
                    </>
                )}
            </nav>
        </>
    );
};

export default Nav;