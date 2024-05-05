import { object, string, number, date, bool } from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useOutletContext, useLocation, } from 'react-router-dom'
import toast from "react-hot-toast"
import { GoogleOAuthProvider, useGoogleOAuth } from "@react-oauth/google";
import React, { useState, useEffect } from "react"

const signupSchema = object({
    username: string()
        .min(2, "Usernames must be at least 2 chars long")
        .max(20, "Usernames must be max 20 chars")
        .required("Username is required"),
    email: string().email().required("Email is required"),
    birthday: date().required("Birthdate is required"),
    password_hash: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(
            /[a-zA-Z0-9]/,
            "Passwords can only contain latin numbers and letters"
        )
        .required("Password is required"),
});
const signinSchema = object({
    email: string().email().required("Email is required"),
    password_hash: string()
        .min(8, "Passwords must be at least 8 chars long")
        .matches(
            /[a-zA-Z0-9]/,
            "Passwords can only contain latin numbers and letters"
        )
        .required("Password is required"),
});

const initialValues = {
    username: "",
    email: "",
    birthday: "",
    password_hash: ""
}
const Registration = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const [isLogin, setIsLogin] = useState(isLoginPage);
    const { currentUser, updateCurrentUser } = useOutletContext();
    const navigate = useNavigate()
    const requestUrl = isLogin ? "/login" : "/signup"

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const formik = useFormik({
        initialValues,
        validationSchema: isLogin ? signinSchema : signupSchema,
        onSubmit: (formData) => {
            console.log("Form submitted", formData);
            fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(user => {
                            updateCurrentUser(user);
                            navigate("/");
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
    // gooogle stuff!
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.onload = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleCallbackResponse,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('buttonDiv'),
                    {
                        theme: 'filled_black', size: 'medium', shape: 'pill', text: 'continue_with', logo_alignment: "right",
                        width: 150,
                    }
                );
            } else {
                console.error('Google API failed to load');
            }
        };
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleCallbackResponse = (response) => {
        fetch('/google-auth', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id_token: response.credential }),
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(user => {
                    updateCurrentUser(user);
                    navigate("/");
                })
            } else {
                resp.json().then(errorobj => {
                    toast.error(errorobj.message)
                });
            }
        }).catch(error => {
            toast.error("Network error: " + error.message);
        });
    };

    return (
        <div>
            <h2>Please Log In or Signup!</h2>
            <button onClick={() => setIsLogin((current) => !current)}>
                {isLogin ? "Register Now!" : "Login!"}
            </button>
            <div id="buttonDiv"></div>

            {
                isLogin && (
                    <form onSubmit={formik.handleSubmit}>
                        <label>Email </label>
                        <input
                            type="text"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="error-message show">{formik.errors.email}</div>
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
                            <div className="error-message show">{formik.errors.password_hash}</div>
                        )}

                        <input type="submit" value="Login!" />

                    </form>
                )
            }

            {
                !isLogin && (
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
                            <div className="error-message show">{formik.errors.username}</div>
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
                            <div className="error-message show">{formik.errors.email}</div>
                        )}
                        <label>Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.birthday}
                        />
                        {formik.errors.birthday && formik.touched.birthday && (
                            <div className="error-message">{formik.errors.birthday}</div>
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
                            <div className="error-message show">{formik.errors.password_hash}</div>
                        )}

                        <input type="submit" value="Signup!" />

                    </form>
                )
            }
        </div >
    );
}

export default Registration
