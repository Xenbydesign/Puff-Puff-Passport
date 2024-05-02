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
        <div id={bud.id}>
            <h3 id="cardTitle">{strain.name}</h3>
            <div className="Card">
                {bud.pic ? (
                    <img src={bud.pic} alt={strain.name} className="card-image" />
                ) : (
                    <img src={strain.pic} alt={strain.name} />
                )}
                <p>{strain.name}</p>
                <Link to={`/budtracker/${bud.id}`}>see more</Link>
            </div>
        </div>
    );
}

export default BudCard
