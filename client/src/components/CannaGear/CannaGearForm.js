import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { object, string, date, boolean, number } from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CannaGearSchema = object({
    gear_type: string().required('Required'),
    brand: string().required('Required'),
    model: string(),
    purchase_date: date(),
    price: number().integer().min(1),
    rating: number().integer().min(1).max(5).nullable(true),
    notes: string(),
    pic: string().url('Must be a valid URL'),
    visible: boolean(),

});


const CannaGearForm = () => {
    const { gearId } = useParams();
    const { currentUser } = useOutletContext();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        user_id: currentUser?.id,
        gear_type: '',
        brand: '',
        model: '',
        purchase_date: '',
        price: null,
        rating: null,
        notes: '',
        pic: '',
        visible: false
    });

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    useEffect(() => {
        if (gearId) {
            fetch(`/canna-gears/${gearId}`)
                .then(resp => resp.json())
                .then(data => {
                    setInitialValues(prevValues => ({
                        ...prevValues,
                        ...data
                    }));
                })
                .catch(error => {
                    toast.error("Failed to load the data: " + error.message);
                    navigate("/cannagear");
                });
        }
    }, [gearId, navigate]);

    const handleSubmit = (formData, { setSubmitting }) => {
        const method = !gearId ? 'POST' : 'PATCH';
        const url = !gearId ? `/canna-gears` : `/canna-gears/${gearId}`;
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
                        navigate("/cannagear");
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
            <h1>{!gearId ? "Add New Gear" : "Edit Gear"}</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={CannaGearSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Field name="gear_type" placeholder="Gear Type" />
                        {errors.gear_type && touched.gear_type && <div>{errors.gear_type}</div>}
                        <Field name="brand" placeholder="Brand" />
                        {errors.brand && touched.brand && <div>{errors.brand}</div>}
                        <Field name="model" placeholder="Model" />
                        {errors.model && touched.model && <div>{errors.model}</div>}
                        <Field name="purchase_date" type="date" />
                        {errors.purchase_date && touched.purchase_date && <div>{errors.purchase_date}</div>}
                        <Field name="price" type="number" placeholder="Price" />
                        {errors.price && touched.price && <div>{errors.price}</div>}
                        <Field name="rating" type="number" placeholder="Rating" />
                        {errors.rating && touched.rating && <div>{errors.rating}</div>}
                        <Field name="notes" placeholder="Notes" />
                        {errors.notes && touched.notes && <div>{errors.notes}</div>}
                        <Field name="pic" placeholder="Pic" />
                        {errors.pic && touched.pic && <div>{errors.pic}</div>}
                        <Field name="visible"
                            type="checkbox" /><label htmlFor="visible">Make Public</label>
                        {errors.visible && touched.visible && <div>{errors.visible}</div>}
                        <button type="submit" disabled={isSubmitting}>
                            {!gearId ? "Submit" : "Update"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default CannaGearForm;