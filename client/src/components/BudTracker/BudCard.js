import { useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

function BudCard({ bud, fetchBuds }) {
    const navigate = useNavigate()
    if (!bud) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }

    const handleInfoPage = () => {
        navigate(`/budtracker/${bud.id}`)
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
                    <button onClick={handleInfoPage}>see more</button>
                </div>
            </div>
        </div >
    );
}

export default BudCard
