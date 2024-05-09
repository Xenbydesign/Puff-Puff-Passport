import { Link, useLocation, useParams, useOutletContext } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

function BudCard({ bud, fetchBuds }) {
    if (!bud) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }

    const { strain } = bud || fetchBuds
    return (
        <div className="card-container">
            <div className="card" id={bud.id}>
                <figure className="card-figure">
                    {bud.pic ? (
                        <img className="img" src={bud.pic} alt={strain.name} />
                    ) : (
                        <img className="img" src={strain.pic} alt={strain.name} />
                    )}
                </figure>
                <div className="card-body">
                    <h3 id="cardTitle">{strain.name}</h3>
                    <p className="card-text">{strain.name}</p>
                    <Link to={`/budtracker/${bud.id}`}>see more</Link>
                </div>
            </div>
        </div >
    );
}

export default BudCard
