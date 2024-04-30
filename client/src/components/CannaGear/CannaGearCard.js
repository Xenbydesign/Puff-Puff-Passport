import { Link, useNavigate, useParams, useOutletContext }
    from "react-router-dom"
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader"

function CannaGearCard({ setCannaGear, gear, fetchGear }) {
    const { gearId } = useParams()
    const { currentUser } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);


    const togglePublic = () => {
        fetch(`/canna-gear/${gearId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ visible: !gear.visible })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(setCannaGear)
                }
                return resp.json().then(errorObj => toast.error(errorObj.message))
            })
            .catch(err => toast.error(err.message))
    }
    const handleDelete = (bud) => {
        fetch(`/canna-gear/${gearId}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.status === 204) {
                    deleteGear(gear)
                    navigate("#")
                } else {
                    return resp.json().then(errorObj => toast.error(errorObj.message))
                }
            })
            .catch(err => toast.error(err.message))
    }

    const deleteGear = (deleted_Gear) => (gears => gears.filter(() => gear.id !== deleted_Gear.id))

    if (!gear && !fetchGear) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }
    const { user_id, model, pic, brand, purchase_date, price, rating, notes, visible, gear_type } = gear;
    return (
        <div>
            <h3 id="cardTitle">{model}</h3>
            <div id="card">
                <img src={pic} alt={model} className="card-image" />
                <p><strong>Brand:</strong> {brand}</p>
                <Link to="#" onClick={(e) => e.preventDefault()}>
                    <div id="cardText">
                        <p><strong>Purchase Date:</strong>{purchase_date}</p>
                        <p><strong>type:</strong>{gear_type}</p>
                        <p><strong>price:</strong> {price}</p>
                        <p><strong>rating:</strong> {rating}</p>
                        <p><strong>notes:</strong> {notes}</p>
                        {currentUser && currentUser.id === user_id &&
                            <>
                                <button onClick={togglePublic}>{visible ? "make public" : "hide from view"}</button>
                                {/* <button onClick={() => handleEdit(gear)} >Edit</button> */}
                                <button onClick={() => handleDelete(gear)} >Delete</button>
                            </>
                        }
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default CannaGearCard