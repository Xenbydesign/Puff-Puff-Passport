import { useNavigate, useOutletContext }
    from "react-router-dom"
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { fetchWithCSRF } from '../helpers/fetchWithCSRF';

function CannaGearCard({ gear, fetchGear, setCannaGear }) {
    const { currentUser } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const togglePublic = () => {
        fetchWithCSRF(`/canna-gears/${gear.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ visible: !gear.visible })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then((updatedGear) => {
                        // Assuming the response is the updated object, update only that gear item
                        setCannaGear((prevGears) => prevGears.map(gear => gear.id === updatedGear.id ? updatedGear : gear));
                        toast.success('Your Gears Public View has been updated!');
                        fetchGear();  // Fetch the entire list again if needed
                    });
                } else {
                    return resp.json().then(errorObj => toast.error(errorObj.message));
                }
            })
            .catch(err => toast.error(err.message));
    }


    const handleDelete = () => {
        fetchWithCSRF(`/canna-gears/${gear.id}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.ok) {
                    deleteGear(gear.id);
                    toast.success('Gear deleted successfully');
                    fetchGear();
                } else {
                    return resp.json().then(errorObj => toast.error(errorObj.message))
                }
            })
            .catch(err => toast.error(err.message))
    }
    const deleteGear = (deleted_Gear) => (gear => gear.filter((gear) => gear.id !== deleted_Gear.id))

    const handleEdit = () => {
        navigate(`/cannagear/edit/${id}`)
    }


    const { id, user_id, model, pic, brand, purchase_date, price, rating, notes, visible, gear_type } = gear;
    return (
        <div className="card-container">
            <div className="card">
                <figure className="card-figure">
                    <img src={pic} alt={model} className="img" />
                </figure>
                <div className="card-body">
                    <h3 id="cardTitle">{model}</h3>
                    <p className="card-text"><strong>Brand:</strong> {brand}</p>
                    <p className="card-text"><strong>Purchase Date:</strong> {purchase_date}</p>
                    <p className="card-text"><strong>Type:</strong> {gear_type}</p>
                    <p className="card-text"><strong>Price:</strong> {price}</p>
                    <p className="card-text" ><strong>Rating:</strong> {rating}</p>
                    <p className="card-text" ><strong>Notes:</strong> {notes}</p>

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