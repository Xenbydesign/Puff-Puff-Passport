import React, { useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";



function StrainCard({ strain }) {
    const { currentUser } = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    const handleTrackStrain = () => {
        navigate(`/budtracker/new/${strain.id}`)
    }


    return (
        <div>
            <h3 id="cardTitle">{strain.name}</h3>
            <div id="card">
                <img src={strain.pic} alt={strain.name} className="card-image" />
                <p><strong>Type:</strong> {strain.type}</p>
                <Link to="#" onClick={(e) => e.preventDefault()}>
                    <div id="cardText">
                        <p><strong>Potency:</strong>{strain.potency}</p>
                        <p><strong>Effects:</strong> {strain.effects}</p>
                        <p><strong>Flavor:</strong> {strain.flavor}</p>
                        <p><strong>Description:</strong> {strain.description}</p>
                        <button onClick={handleTrackStrain}>Add to Tracker</button>
                    </div>
                </Link>
            </div>
        </div>
    );

}


export default StrainCard