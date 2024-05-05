import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { object, string } from 'yup';
import toast from "react-hot-toast";

const profileSchema = object({
    username: string()
        .min(2, "Usernames must be at least 2 chars long")
        .max(20, "Usernames must be max 20 chars")
        .required("Username is required"),
    email: string().email().required("Email is required"),
    profile_pic: string().notRequired(),  // assuming you handle files, this validation might need adjustment
    password_hash: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(
            /[a-zA-Z0-9]/,
            "Passwords can only contain Latin numbers and letters"
        )
        .required("Password is required"),
});

const UserSettings = () => {
    const { currentUser, updateCurrentUser } = useOutletContext();
    console.log(currentUser);
    const [passwordVerified, setPasswordVerified] = useState(false);

    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState([])

    useEffect(() => {
        if (currentUser) {
            setInitialValues({
                username: currentUser.username,
                email: currentUser.email,
                profile_pic: '',
            });
        }
    }, [currentUser]);


    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const verifyPassword = (password) => {
        // Verify the password
        if (currentUser) {
            fetch(`/verify-password/${currentUser.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.isValid) {
                        setPasswordVerified(true);
                    } else {
                        throw new Error("Password verification failed");
                    }
                })
                .catch(error => {
                    toast.error(error.message || "An error occurred");
                });
        }
    };



    useEffect(() => {
        if (currentUser && passwordVerified) {
            fetch(`/users/${currentUser.id}`)
                .then(resp => resp.json())
                .then(data => {
                    setInitialValues(prevValues => ({
                        ...prevValues,
                        ...data
                    }));
                })
                .catch(error => {
                    toast.error("Failed to load the data: " + error.message);
                    navigate("/settings");
                });
        }
    }, [currentUser.id, navigate, passwordVerified]);


    const handleProfilePicChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("profile_pic", file);
        }
    };



    const formik = useFormik({
        initialValues,
        validationSchema: profileSchema,
        onSubmit: (formData) => {
            console.log("Form submitted", formData);
            fetch((`/users/${currentUser.id}`), {
                method: "Patch",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(user => {
                            updateCurrentUser(user);
                            navigate("/user/settings");
                        })
                    } else {
                        resp.json().then(errorobj => {
                            toast.error(errorobj.message)
                        })
                            ;
                    }
                })
                .catch(error => {
                    toast.error("Network error:" + error.message);
                });
        }
    });

    return (
        <div>
            <h2>{edit ? "Edit Your Profile" : "Profile"}</h2>
            <button onClick={() => setEdit(!edit)}>
                {edit ? "Go Back" : "Edit Profile"}
            </button>
            {edit && (
                <>
                    {passwordVerified ?
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

                            <label>Profile Picture</label>
                            <input
                                type="file"
                                name="profile_pic"
                                onChange={handleProfilePicChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.profile_pic && formik.touched.profile_pic && (
                                <div className="error-message">{formik.errors.profile_pic}</div>
                            )}

                            <input type="submit" value="Update" />
                        </form>
                        :
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            verifyPassword(e.target.password.value);
                        }}>
                            <label>Password </label>
                            <input
                                type="password"
                                name="password"
                            />
                            <input type="submit" value="Verify Password" />
                        </form>}
                </>
            )}
        </div>
    )
}
export default UserSettings