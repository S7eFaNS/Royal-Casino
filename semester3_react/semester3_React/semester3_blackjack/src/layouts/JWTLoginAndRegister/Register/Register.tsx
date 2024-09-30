/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useRegister } from "../../Utils/API_Calls/JWT/RegisterFetch";
import { useNavigate  } from 'react-router-dom';
import TokenManager from '../../Utils/API_Calls/JWT/TokenManager';

export const Register = () => {
    const { registerUser } = useRegister();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (TokenManager.getAccessToken()) {
          navigate('/home');
        }
      }, [navigate]);

      const handleInputChange = () => {
        setErrorMessage('');
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email: email,
            name: name,
            password: password,
        };

        if (!email || !name || !password) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setErrorMessage('Please enter a valid email address.');
          return;
        }

        if (password.length < 8) {
            setErrorMessage('Password should be at least 8 characters long.');
            return;
        }

        if (!/^[A-Z]/.test(name)) {
            setErrorMessage('Name should start with a capital letter.');
            return;
        }

        try {
        const registrationResult = await registerUser(userData);

        if (registrationResult.success) {
            TokenManager.setAccessToken(registrationResult.accessToken);
            TokenManager.setClaims(registrationResult.accessToken);

            navigate("/profile");
            window.location.reload();
        } else {
            if (registrationResult.error === 'Email is already registered') {
                setErrorMessage('This email is already in use. Please use a different email.');
            } else {
                setErrorMessage(registrationResult.error);
            }
        }
    } catch (error : any) {
        setErrorMessage(error.message);
    }
    };

    return (
        <div className="d-flex align-items-center py-5 mt-5 mb-4 d-flex flex-column h-100">
            <div className="container p-1 mb-5">
                <div className="form-signin text-center w-100 m-auto" style={{ maxWidth: "330px" }}>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>

                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value)
                                    handleInputChange();
                                }}
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingUsername"
                                placeholder="Username"
                                value={name}
                                onChange={(e) => { setUsername(e.target.value)
                                    handleInputChange();
                                }}
                            />
                            <label htmlFor="floatingUsername">Username</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value)
                                    handleInputChange();
                                }}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button
                            className="btn btn-primary w-100 py-2 mt-2"
                            style={{ color: "white", backgroundColor: "#4f1098", fontWeight: "bold" }}
                            type="submit"
                        >
                            Sign up
                        </button>
                    </form>
                    <div className="text-center mt-1">
                        <p>
                            Have an account? <a href="/login" style={{ color: "purple", fontWeight: "bold" }}>Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
