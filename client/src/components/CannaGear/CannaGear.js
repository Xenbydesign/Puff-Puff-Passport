import React, { useCallback, useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import CannaGearCard from './CannaGearCard'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader"

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
        fetch("/canna-gears")
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
        <div className="tracked gear page">
            <h1>My Canna Gear</h1>
            <button onClick={() => handleNewGear()} >Add New Gear</button>
            {allGear ? allGear : null}

        </div>
    );
}
export default CannaGear