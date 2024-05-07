import React, { useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"


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
    if (!strain) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }

    return (
        <div className="card-container">
            <div className="card">
                <figure className="card-figure">
                    <img className="img" src={strain.pic} alt={strain.name} />
                </figure>
                <div className="card-body">
                    <h3 className="card-title">{strain.name}</h3>
                    <p className="card-text"><strong>Type:</strong> {strain.type}</p>
                    <p className="card-text"><strong>Potency:</strong>{strain.potency}</p>
                    <p className="card-text"><strong>Effects:</strong> {strain.effects}</p>
                    <p className="card-text"><strong>Flavor:</strong> {strain.flavor}</p>
                    <p className="card-text"><strong>Description:</strong> {strain.description}</p>
                    <button onClick={handleTrackStrain}>Add to Tracker</button>
                </div>
            </div>
        </div>
    );

}


export default StrainCard