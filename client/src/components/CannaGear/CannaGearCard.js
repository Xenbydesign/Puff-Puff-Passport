import { useNavigate, useOutletContext }
    from "react-router-dom"
import { useEffect } from 'react'
import toast from 'react-hot-toast';

function CannaGearCard({ gear, fetchGear, setCannaGear }) {
    const { currentUser } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const togglePublic = () => {
        fetch(`/canna-gears/${gear.id}`, {
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

    const handleDelete = () => {
        fetch(`/canna-gears/${gear.id}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.ok) {
                    toast.success('Gear deleted successfully');
                    fetchGear();
                } else {
                    return resp.json().then(errorObj => toast.error(errorObj.message))
                }
            })
            .catch(err => toast.error(err.message))
    }

    const handleEdit = () => {
        navigate(`/cannagear/edit/${id}`)
    }


    const { id, user_id, model, pic, brand, purchase_date, price, rating, notes, visible, gear_type } = gear;
    return (
        <div data-gear-id={id}>
            <h3 id="cardTitle">{model}</h3>
            <div id="card">
                <img src={pic} alt={model} className="card-image" />
                <p><strong>Brand:</strong> {brand}</p>
                <div id="cardText">
                    <p><strong>Purchase Date:</strong> {purchase_date}</p>
                    <p><strong>Type:</strong> {gear_type}</p>
                    <p><strong>Price:</strong> {price}</p>
                    <p><strong>Rating:</strong> {rating}</p>
                    <p><strong>Notes:</strong> {notes}</p>
                    {currentUser && currentUser.id === user_id && (
                        <>
                            <button onClick={togglePublic}>{!visible ? "Make Public" : "Hide from View"}</button>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default CannaGearCard