import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader"

function BudDetail() {
    const [bud, setBud] = useState(null)
    const { currentUser } = useOutletContext()
    const { budId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    useEffect(() => {
        fetch(`/bud-trackers/${budId}`)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json().then(setBud)
                }
                return resp.json().then(errorObj => toast.error(errorObj.message))
            })
            .catch(err => toast.error(err.message))
    }, [])


    const handleDelete = (bud) => {
        fetch(`/bud-trackers/${budId}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.status === 204) {
                    deleteBud(bud)
                    navigate("/")
                } else {
                    return resp.json().then(errorObj => toast.error(errorObj.message))
                }
            })
            .catch(err => toast.error(err.message))
    }

    const deleteBud = (deleted_Bud) => (buds => buds.filter((bud) => bud.id !== deleted_Bud.id))

    const handleEdit = () => {
        navigate(`/budtracker/edit/${budId}`)
    }

    const toggleStock = () => {
        fetch(`/bud-trackers/${budId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ in_stock: !bud.in_stock })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(setBud)
                }
                return resp.json().then(errorObj => toast.error(errorObj.message))
            })
            .catch(err => toast.error(err.message))
    }
    if (!bud) {
        return <ClipLoader
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }
    const { strain, id, user_id, grower, type, dispensary, pic, in_stock, cost, rating, flavor, my_effects, purchase_date, purchase_amount } = bud;
    return (
        <div id={id}>
            {bud.pic ? (
                <img src={pic} alt={strain.name} />
            ) : (
                <img src={strain.pic} alt={strain.name} />
            )}
            <p>{strain.name}</p>
            <p>{strain.type}</p>
            <p>{grower}</p>
            <p>{type}</p>
            <p>{dispensary}</p>
            <p>{cost}</p>
            <p>{rating}</p>
            <p>{flavor}</p>
            <p>{my_effects}</p>

            {currentUser && currentUser.id === user_id &&
                <>
                    <button onClick={toggleStock}>
                        {in_stock ? "Im out" : "got some"}
                    </button>
                    <p>{purchase_date}</p>
                    <p>{purchase_amount}</p>
                    <button onClick={() => handleEdit(bud)} >Edit</button>
                    <button onClick={() => handleDelete(bud)} >Delete</button>
                </>
            }
        </div>
    )
}

export default BudDetail
