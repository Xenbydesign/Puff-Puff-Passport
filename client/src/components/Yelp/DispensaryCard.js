import React from "react";

function DispensaryCard({ dispensary }) {

    return (
        <div className="card">
            <img src={dispensary.image_url} alt={dispensary.name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{dispensary.name}</h5>
                <p className="card-text">
                    {dispensary.location.display_address.join(', ')}
                </p>
                <p className="card-text">Rating: {dispensary.rating} stars</p>
                <p className="card-text">Reviews: {dispensary.review_count}</p>
                <a href={dispensary.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View on Yelp</a>
            </div>
        </div>
    );
}

export default DispensaryCard;