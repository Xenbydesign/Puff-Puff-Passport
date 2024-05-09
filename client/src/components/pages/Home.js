

import StrainCard from "../Strains/StrainCard";
import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import DispensaryCard from "../Yelp/DispensaryCard";
import Dispensaries from "../Yelp/Dispensaries";
import BudTracker from "../BudTracker/BudTracker";

function Home() {
    const { strains, currentUser } = useOutletContext();
    const [dispensaries, setDispensaries] = useState([]);
    const navigate = useNavigate()
    const [filteredStrains, setFilteredStrains] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        if (!currentUser) {
            navigate("/login", { replace: true });
        }
    }, [currentUser, navigate]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };


    useEffect(() => {

        const trimmedQuery = searchQuery.trim().toLowerCase(); // Trims and converts to lower case
        const result = strains?.filter(strain =>
            strain.name.toLowerCase().includes(trimmedQuery) ||
            strain.type.toLowerCase().includes(trimmedQuery) ||
            strain.effects.toLowerCase().includes(trimmedQuery)
        );
        setFilteredStrains(result);
    }, [strains, searchQuery]);


    return (
        <div>
            <div className="parent">
                <input
                    type="text"
                    placeholder="Search strains..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="dev1">
                <div className="card-wrapper">
                    {filteredStrains && filteredStrains.length > 0 ? (
                        filteredStrains.map(strain => (
                            <StrainCard key={strain.id} strain={strain} />
                        ))
                    ) : (
                        <div>No strains found</div>
                    )}
                </div>
            </div>
            <div className="div2">
                <Dispensaries setDispensaries={setDispensaries} />
                <div className="card-wrapper">
                    {dispensaries.map(dispensary => (
                        <DispensaryCard key={dispensary.id} dispensary={dispensary} />
                    ))}
                </div>
            </div>

        </div>

    );
}



export default Home