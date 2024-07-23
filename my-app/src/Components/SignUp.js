import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = formData;

        if (password !== cpassword) {
            setError('Passwords do not match');
            setSuccessMessage('');
            return;
        }

        console.log('Submitting form...', formData);

        try {
            const url = 'http://localhost:5000/api/auth/createuser';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();
            console.log(json);

            if (json.success) {
                setSuccessMessage('Sign Up successful! Redirecting to main page...');
                setError('');
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  cpassword: '',
              });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError(json.message || 'Sign Up failed');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Unable to connect to the server. Please ensure the server is running and try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        onChange={onChange}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        aria-describedby="nameHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        onChange={onChange}
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        onChange={onChange}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input
                        onChange={onChange}
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
