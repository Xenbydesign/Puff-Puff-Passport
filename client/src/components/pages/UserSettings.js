import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { object, string } from 'yup';
import toast from "react-hot-toast";

const profileSchema = object({
    username: string()
        .min(2, "Usernames must be at least 2 chars long")
        .max(20, "Usernames must be max 20 chars long")
        .required("Username is required"),
    email: string()
        .email("Invalid email format")
        .required("Email is required"),
    profile_pic: string()
        .matches(/^https?:\/\/.*\.(png|jpeg|jpg)$/i, "Images must be in a valid format (jpg, jpeg, png)"),
    password_hash: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(/[a-zA-Z0-9]/, "Passwords can only contain Latin numbers and letters")
        .required("Password is required"),
});

const UserSettings = () => {
    const { currentUser, updateCurrentUser, headers } = useOutletContext();
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const formik = useFormik({
        initialValues: {
            username: currentUser.username,
            email: currentUser.email,
            profile_pic: '',
            password_hash: '',
        },
        validationSchema: profileSchema,
        onSubmit: (values, { setSubmitting }) => {
            const data = {
                username: values.username,
                email: values.email,
                password_hash: values.password_hash,
            };
            if (values.profile_pic) {
                data.profile_pic = values.profile_pic;
            }

            fetch(`/users/${currentUser.id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(data)
            })
                .then(resp => {
                    setSubmitting(false);
                    if (resp.ok) {
                        resp.json().then(() => navigate("/user/settings"));
                    } else {
                        resp.json().then(errorObj => toast.error(errorObj.message));
                    }
                })
                .catch(error => {
                    setSubmitting(false);
                    toast.error("Network error: " + error.message);
                });
        },
    });

    return (
        <div>
            <h2>{edit ? "Edit Your Profile" : "Profile"}</h2>
            <button onClick={() => setEdit(!edit)}>
                {edit ? "Go Back" : "Edit Profile"}
            </button>
            {edit && currentUser && (
                <form onSubmit={formik.handleSubmit}>

                    <label>Username </label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username && (
                        <div className="error-message">{formik.errors.username}</div>
                    )}

                    <label>Email </label>
                    <input
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="error-message">{formik.errors.email}</div>
                    )}

                    <label>Password </label>
                    <input
                        type="password"
                        name="password_hash"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password_hash}
                    />
                    {formik.errors.password_hash && formik.touched.password_hash && (
                        <div className="error-message">{formik.errors.password_hash}</div>
                    )}

                    <label>Profile Image URL</label>
                    <input
                        type="text"
                        name="profile_pic"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.profile_image}
                    />
                    {formik.errors.profile_image && formik.touched.profile_image && (
                        <div className="error-message">{formik.errors.profile_image}</div>
                    )}
                    <input type="submit" value="Update" />
                </form>
            )}
        </div>
    );
};

export default UserSettings;