import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer>
            <div>
                <Link to="/cannaeducation" className="foot-link">
                    Cannabis 101
                </Link>
            </div>

            <p>&#128150;Canna Keeper built By&#128150; </p>

            <div>
                <a className="foot-link" href='https://github.com/Xenbydesign' rel='noreferrer noopener' target='_blank'> ✨Xen Contreas✨ </a>
            </div>



        </footer>
    )
}

export default Footer