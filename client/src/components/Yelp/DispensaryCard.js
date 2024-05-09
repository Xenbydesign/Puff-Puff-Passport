import React from "react";
import yelp_burst from "../../styles/yelp_burst.png"

function DispensaryCard({ dispensary }) {

    return (

        <div className="card-container">
            <div className="card">
                <figure className="card-figure">
                    <img src={dispensary.image_url} alt={dispensary.name} />
                </figure>
                <div className="card-body">
                    <h5 className="card-title">{dispensary.name}</h5>
                    <p className="card-text">
                        {dispensary.location.display_address.join(', ')}
                    </p>
                    <p className="card-text">Rating: {dispensary.rating} stars</p>
                    <p className="card-text">Reviews: {dispensary.review_count}</p>

                    <button className="btn" onClick={() => window.open(dispensary.url, "_blank")}>
                        <img className="yelp-burst" src={yelp_burst} alt="Yelp Logo" /> view on Yelp</button>

                </div>
            </div>
        </div>
    );
}

export default DispensaryCard;