import { useNavigate } from "react-router-dom";
import "./Login.css"
import { useLogin } from "../../Utils/API_Calls/JWT/LoginFetch";
import { useEffect, useState } from "react";
import TokenManager from "../../Utils/API_Calls/JWT/TokenManager";

export const Login : React.FC  = () => {
    const { loginUser } = useLogin();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
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
            password: password,
        };

        if (!email || !password) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        const loginResult = await loginUser(userData);

        if (loginResult.success) {
            TokenManager.setAccessToken(loginResult.accessToken);
            TokenManager.setClaims(loginResult.accessToken);
            
            navigate('/profile');
            window.location.reload();
        } else {
            if (loginResult.error === 'Invalid credentials') {
                setErrorMessage('Invalid credentials');
            } else {
                setErrorMessage(loginResult.error);
            }
        }
    };
    return (
        <div className="d-flex flex-grow-1 align-items-center py-5 mt-5 mb-4 flex-column h-100" > 
            <div className="container p-2 mb-5">
                <div className="form-signin text-center w-100 m-auto" style={{ maxWidth: "330px" }}>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="email"
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
                            <input type="password"
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
                        <button className="btn btn-primary w-100 py-2" style={{color:"white", backgroundColor:"#4f1098", fontWeight:"bold"}} type="submit">
                            Sign in
                        </button>
                    </form>
                    <div className="text-center mt-1">
                            <p>Don't have an account? <a href="/register" style={{color: "purple", fontWeight:"bold"}}>Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
