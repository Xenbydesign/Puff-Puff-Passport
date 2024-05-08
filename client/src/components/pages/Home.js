

import StrainCard from "../Strains/StrainCard";
import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import DispensaryCard from "../Yelp/DispensaryCard";
import Dispensaries from "../Yelp/Dispensaries";

function Home() {
    const { strains, currentUser } = useOutletContext();
    const [dispensaries, setDispensaries] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    const handlesearchstrains = () => { }



    return (
        <div className="card-wrapper">
            {strains ? (
                strains.map(strain => (

                    <StrainCard key={strain.id} strain={strain} />

                ))
            ) : (
                <div>Loading...</div>
            )}

            <div>
                <Dispensaries setDispensaries={setDispensaries} />
                <div className="card-container">
                    {dispensaries.map(dispensary => (
                        <DispensaryCard key={dispensary.id} dispensary={dispensary} />
                    ))}
                </div>
            </div>
        </div>
    );
}



export default Home