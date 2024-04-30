import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { object, string, date, boolean, number } from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const NewBudTrackerSchema = object({
    grower: string(),
    dispensary: string().required('Required'),
    purchase_date: date().required('Required'),
    purchase_amount: string(),
    cost: number().positive(),
    rating: number().integer().min(1).max(5).nullable(true),
    flavor: string(),
    pic: string().url('Must be a valid URL'),
    my_effects: string(),
    in_stock: boolean()
});

const EditBudTrackerSchema = object({
    dispensary: string().required('Required'),
    grower: string(),
    rating: number().integer().min(1).max(5).nullable(true),
    flavor: string(),
    pic: string().url('Must be a valid URL'),
    my_effects: string(),
});

const BudTrackerForm = () => {
    const { strainId, budId } = useParams();
    const { currentUser } = useOutletContext();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        user_id: currentUser?.id,
        strain_id: strainId,
        grower: '',
        dispensary: '',
        purchase_date: '',
        purchase_amount: '',
        cost: null,
        rating: null,
        flavor: '',
        pic: '',
        my_effects: '',
        in_stock: false,
    });

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    useEffect(() => {
        if (budId) {
            fetch(`/bud-trackers/${budId}`)
                .then(resp => resp.json())
                .then(data => {
                    setInitialValues(prevValues => ({
                        ...prevValues,
                        ...data
                    }));
                })
                .catch(error => {
                    toast.error("Failed to load the data: " + error.message);
                    navigate("/budtracker");
                });
        }
    }, [budId, navigate]);

    const handleSubmit = (formData, { setSubmitting }) => {
        const method = strainId ? 'POST' : 'PATCH';
        const url = strainId ? `/bud-trackers` : `/bud-trackers/${budId}`;
        const { strain, id, ...dataToSend } = formData;

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        })
            .then(resp => {
                setSubmitting(false);
                if (resp.ok) {
                    resp.json().then(() => {
                        navigate("/budtracker");
                    });
                } else {
                    resp.json().then(errorObj => {
                        toast.error(errorObj.message);
                    });
                }
            })
            .catch(error => {
                setSubmitting(false);
                toast.error("Network error: " + error.message);
            });
    };
    return (
        <div>
            <h1>{strainId ? "Add New Bud Tracker Entry" : "Edit Bud Tracker Entry"}</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={strainId ? NewBudTrackerSchema : EditBudTrackerSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Field name="grower" placeholder="Grower" />
                        {touched.grower && errors.grower && <div>{errors.grower}</div>}

                        <Field name="dispensary" placeholder="Dispensary" />
                        {touched.dispensary && errors.dispensary && <div>{errors.dispensary}</div>}

                        <Field
                            name="purchase_date"
                            type="date"
                            disabled={!!budId} // Convert budId to a boolean to ensure proper disabling
                            onClick={() => {
                                if (budId) toast.info("Purchase date cannot be changed.");
                            }}
                        />
                        {touched.purchase_date && errors.purchase_date && <div>{errors.purchase_date}</div>}

                        <Field name="purchase_amount" placeholder="Purchase Amount" disabled={!!budId}
                            onClick={() => {
                                if (budId) toast.info("Purchase amount cannot be changed.");
                            }} />
                        {touched.purchase_amount && errors.purchase_amount && <div>{errors.purchase_amount}</div>}

                        <Field name="cost" type="number" placeholder="Cost" disabled={!!budId}
                            onClick={() => {
                                if (budId) toast.info("cost cannot be changed.");
                            }} />
                        {touched.cost && errors.cost && <div>{errors.cost}</div>}

                        <Field name="rating" type="number" placeholder="Rating" />
                        {touched.rating && errors.rating && <div>{errors.rating}</div>}

                        <Field name="flavor" placeholder="Flavor" />
                        {touched.flavor && errors.flavor && <div>{errors.flavor}</div>}

                        <Field name="pic" placeholder="Picture URL" />
                        {touched.pic && errors.pic && <div>{errors.pic}</div>}

                        <Field name="my_effects" placeholder="Effects" />
                        {touched.my_effects && errors.my_effects && <div>{errors.my_effects}</div>}

                        <Field name="in_stock" type="checkbox" />
                        <label htmlFor="in_stock">In Stock</label>
                        <button type="submit" disabled={isSubmitting}>
                            {strainId ? "Submit" : "Update"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default BudTrackerForm;