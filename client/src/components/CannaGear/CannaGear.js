import React, { useCallback, useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import CannaGearCard from './CannaGearCard'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader"
import { fetchWithCSRF } from '../fetchWithCSRF';

const CannaGear = () => {
    const { currentUser } = useOutletContext();
    const [cannaGear, setCannaGear] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    const fetchGear = () => {
        fetchWithCSRF("/canna-gears")
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(setCannaGear)
                }
                return resp.json().then(errorObj => toast.error(errorObj.message))
            })
            .catch(err => toast.error(err.message))
    }

    useEffect(() => {
        fetchGear();
    }, []);

    const handleNewGear = useCallback(() => {
        navigate("/cannagear/new");
    }, [navigate]);

    const allGear = cannaGear ? cannaGear.map(gear => <CannaGearCard key={gear.id} gear={gear} fetchGear={fetchGear} setCannaGear={setCannaGear} />
    ) : null;

    if (!cannaGear) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }

    return (
        <div className="gear-container">
            <div>
                <h1>My Canna Gear</h1>
                <button onClick={() => handleNewGear()} >Add New Gear</button>
            </div>
            <div className="card-wrapper">
                {allGear ? allGear : null}
            </div>
        </div>
    );
}
export default CannaGear