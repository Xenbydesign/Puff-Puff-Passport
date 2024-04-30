
import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import BudCard from './BudCard'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader"

const BudTracker = () => {
    const { currentUser } = useOutletContext();
    const [buds, setBuds] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    const fetchBuds = () => {
        fetch("/bud-trackers")
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(setBuds)
                }
                return resp.json().then(errorObj => toast.error(errorObj.message))
            })
            .catch(err => toast.error(err.message))
    }

    useEffect(() => {
        fetchBuds();
    }, []);

    const allTrackedBud = buds ? buds.map(bud => <BudCard key={bud.id} bud={bud} fetchBuds={fetchBuds} />
    ) : null;

    if (!buds) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }

    return (
        <div className="tracked bud page">
            <h1>Bud Tracker</h1>
            {allTrackedBud ? allTrackedBud : null}
        </div>
    );
}

export default BudTracker