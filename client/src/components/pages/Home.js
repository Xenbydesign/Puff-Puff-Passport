

import StrainCard from "../Strains/StrainCard";
import React, { useEffect } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";

function Home() {
    const { strains, currentUser } = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);


    console.log(strains)
    return (
        <>
            {strains ? (
                strains.map(strain => (
                    <div key={strain.id} className="card">
                        <StrainCard strain={strain} />
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}



export default Home