
import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import BudCard from './BudCard'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader"
import { fetchWithCSRF } from '../helpers/fetchWithCSRF';

const BudTracker = ({ onlyInStock }) => {
    const { currentUser } = useOutletContext();
    const [buds, setBuds] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);


    const fetchBuds = () => {
        fetchWithCSRF("/bud-trackers", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(setBuds);
                }
                return resp.json().then(errorObj => toast.error(errorObj.message));
            })
            .catch(err => toast.error(err.message));
    }

    useEffect(() => {
        fetchBuds();
    }, []);

    const displayedBuds = buds && onlyInStock ? buds.filter(bud => bud.inStock) : buds;

    const allTrackedBud = displayedBuds ? displayedBuds.map(bud => <BudCard key={bud.id} bud={bud} fetchBuds={fetchBuds} />) : null;

    if (!buds) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }

    return (

        <div className='bud-container'>
            <div>
                <h1>Bud Tracker</h1>
            </div>
            <div className="card-wrapper">
                {allTrackedBud ? allTrackedBud : null}
            </div>
        </div>
    );
}

export default BudTracker