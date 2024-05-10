import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader"
import { fetchWithCSRF } from '../fetchWithCSRF'

function BudDetail() {
    const [bud, setBud] = useState(null)
    const { currentUser, headers, getCookie } = useOutletContext()
    const { budId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchBudDetails = () => {
            fetchWithCSRF(`/bud-trackers/${budId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json().then(setBud);
                    } else {
                        return response.json().then(errorObj => toast.error(errorObj.message));
                    }
                })
                .catch(err => toast.error(err.message));
        };

        if (budId) {
            fetchBudDetails();
        }
    }, [budId]);



    const handleDelete = (budId) => {
        if (typeof budId !== 'number' && typeof budId !== 'string') {
            toast.error('Invalid Bud ID provided.');
            return;
        }

        fetchWithCSRF(`/bud-trackers/${budId}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.ok) {
                    deleteBud(budId);
                    navigate("/budtracker")
                    toast.success('Bud successfully deleted!');
                } else {
                    return resp.json().then(errorObj => {
                        toast.error(errorObj.message);
                    });
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };


    const deleteBud = (deleted_Bud) => (buds => buds.filter((bud) => bud.id !== deleted_Bud.id))

    const handleEdit = () => {
        navigate(`/budtracker/edit/${budId}`)
    }

    const toggleStock = () => {
        fetchWithCSRF(`/bud-trackers/${budId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ in_stock: !bud.in_stock })
        })
            .then(resp => {
                if (resp.ok) {
                    toast.success('Bud successfully updated!')
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
        <div className="bud-details">
            <h1>{strain.name}</h1>
            {bud.pic ? (
                <img src={pic} alt={strain.name} />
            ) : (
                <img src={strain.pic} alt={strain.name} />
            )}
            <dl>
                <dt>Type</dt>
                <dd>{strain.type}</dd>

                <dt>Grower</dt>
                <dd>{grower}</dd>

                <dt>Category</dt>
                <dd>{type}</dd>

                <dt>Dispensary</dt>
                <dd>{dispensary}</dd>

                <dt>Cost</dt>
                <dd>{cost}</dd>

                <dt>Rating</dt>
                <dd>{rating}</dd>

                <dt>Flavor</dt>
                <dd>{flavor}</dd>

                <dt>Effects</dt>
                <dd>{my_effects}</dd>
            </dl>

            {currentUser && currentUser.id === user_id && (
                <dl>
                    <dt>Purchase Date</dt>
                    <dd>{purchase_date}</dd>

                    <dt>Purchase Amount</dt>
                    <dd>{purchase_amount}</dd>

                    <div>
                        <dt>In Stock?</dt>
                        <button onClick={toggleStock}>
                            {in_stock ? "Im out" : "got some"}
                        </button>
                        <dt>Edit and Add rating</dt>
                        <button onClick={() => handleEdit(bud)} >Edit</button>
                        <button onClick={() => handleDelete(bud.id)} >Delete</button>
                    </div>
                </dl>
            )}
        </div>
    )
}

export default BudDetail
