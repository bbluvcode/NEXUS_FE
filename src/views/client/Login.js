/* eslint-disable prettier/prettier */
import React, { useState, useRef, useContext, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/css/Login.css';
import { Input, initMDB } from 'mdb-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../../components/customerLogin/ShowToast'
import { useAuth } from '../../context/AuthContext';

function Login() {
    const { loginCustomer } = useAuth();
    const [email, setEmail] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const loginEmailRef = useRef(null);
    const registerNameRef = useRef(null);
    const loginPasswordRef = useRef(null);
    const registerEmailRef = useRef(null);
    const registerPasswordRef = useRef(null);
    const registerConfirmPasswordRef = useRef(null);

    const containerRef = useRef(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        initMDB({ Input });
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const toggleToRegister = () => {
        containerRef.current?.classList.add('active');
        setRegisterError("");
        setEmail('');
        setPassword('');
        setTimeout(() => registerNameRef.current?.focus(), 300);
    };
    const toggleToLogin = () => {
        containerRef.current?.classList.remove('active');
        setTimeout(() => loginEmailRef.current?.focus(), 300);
        setLoginError("");
        setEmailRegister('');
        setFullName('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        if (email.length === 0) {
            setLoginError('Email is required');
            loginEmailRef.current?.focus();
            return;
        }
        if (!validateEmail(email)) {
            setLoginError("Invalid email format");
            loginEmailRef.current?.focus();
            return;
        }
        if (password.length === 0) {
            setLoginError('Password is required');
            loginPasswordRef.current?.focus();
            return;
        }
        try {
            await loginCustomer(email, password);
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome to NEXUS System...',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => navigate('/'));
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');
        if (fullName.length === 0) {
            setRegisterError('Full Name is required');
            registerNameRef.current?.focus();
            return;
        }
        if (emailRegister.length === 0) {
            setRegisterError('Email is required');
            registerEmailRef.current?.focus();
            return;
        }
        if (!validateEmail(emailRegister)) {
            setRegisterError("Invalid email format");
            registerEmailRef.current?.focus();
            return;
        }
        if (password.length === 0) {
            setRegisterError('Password is required');
            registerPasswordRef.current?.focus();
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            showToast(
                [
                    "Password at least 6 characters.",
                    "Include:",
                    "   At least one uppercase letter.",
                    "   At least one lowercase letter.",
                    "   At least one number."
                ],
                'error', 3000
            );
            registerPasswordRef.current?.focus();
            return;
        }
        if (confirmPassword.length === 0) {
            setRegisterError('ConfirmPassword is required');
            registerConfirmPasswordRef.current?.focus();
            return;
        }
        if (password !== confirmPassword) {
            setRegisterError('Passwords do not match');
            registerConfirmPasswordRef.current?.focus();
            return;
        }
        try {
            const response = await axios.post('http://localhost:5112/api/Auth/register', {
                fullName,
                email: emailRegister,
                password,
            });
            Swal.fire({
                title: 'Registration successful!',
                text: 'Redirecting to the Login page...',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            }).then(() => {
                setEmail(emailRegister);
                setEmailRegister('');
                setFullName('');
                setPassword('');
                setConfirmPassword('');
                toggleToLogin();
            });
        } catch (err) {
            if (err.response?.data) {
                setRegisterError(err.response.data.message);
                registerEmailRef.current?.focus();
            } else {
                setRegisterError('Network error. Please try again.');
            }
        }
    };

    return (

        <div className='login-wrapper'>
            <div className="login-container mt-4" ref={containerRef}>
                {/* SIGNUP */}
                <div className="formLogin-container sign-up">
                    <form onSubmit={handleRegister}>
                        <div className='form-title-Login mb-4'>
                            <button className="btn-title-Login" disabled={false}>
                                <i className="animation-title-Login"></i><h2><strong>SIGN UP</strong></h2><i className="animation-title-Login"></i>
                            </button>
                        </div>
                        {registerError && <p className="text-danger fs-6 mt-1">{registerError}</p>}
                        <div data-mdb-input-init className="form-outline form-outline-Login mb-3">
                            <input
                                type="text"
                                className="form-control fs-6"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    setRegisterError("");
                                }}
                                ref={registerNameRef}
                            />
                            <label className="form-label">Full Name</label>
                        </div>
                        <div data-mdb-input-init className="form-outline form-outline-Login mb-3">
                            <input
                                type="text"
                                className="form-control fs-6"
                                value={emailRegister}
                                onChange={(e) => {
                                    setEmailRegister(e.target.value);
                                    setRegisterError("");
                                }}
                                ref={registerEmailRef}
                            />
                            <label className="form-label">Email address</label>
                        </div>
                        <div data-mdb-input-init className="form-outline form-outline-Login mb-3 password-field-Login">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control fs-6"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setRegisterError("");
                                }}
                                ref={registerPasswordRef}
                            />
                            <label className="form-label">Password</label>
                            <i className={`password-toggle-icon-Login ${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                                onClick={() => setShowPassword(!showPassword)} ></i>
                        </div>
                        <div data-mdb-input-init className="form-outline form-outline-Login password-field-Login">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="form-control fs-6"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setRegisterError("");
                                }}
                                ref={registerConfirmPasswordRef}
                            />
                            <label className="form-label">Confirm Password</label>
                            <i className={`password-toggle-icon-Login ${showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} ></i>
                        </div>
                        <button className="btn-Login">
                            <span>Sign Up</span>
                        </button>
                    </form>
                </div>
                {/* SIGNIN */}
                <div className="formLogin-container sign-in">
                    <form onSubmit={handleLogin}>
                        <div className='form-title-Login mb-4'>
                            <button className="btn-title-Login" disabled={false}><i className="animation-title-Login"></i><h2><strong>SIGN IN</strong></h2><i className="animation-title-Login"></i></button>
                        </div>
                        {loginError && <p className="text-danger fs-6 mt-1">{loginError}</p>}
                        <div data-mdb-input-init className="form-outline form-outline-Login mb-4">
                            <input
                                type="text"
                                className="form-control fs-6"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setLoginError("");
                                }}
                                ref={loginEmailRef}
                            />
                            <label className="form-label">Email address</label>
                        </div>
                        <div data-mdb-input-init className="form-outline form-outline-Login mb-4 password-field-Login">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control fs-6"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setLoginError("");
                                }}
                                ref={loginPasswordRef}
                            />
                            <label className="form-label">Password</label>
                            <i className={`password-toggle-icon-Login ${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                                onClick={() => setShowPassword(!showPassword)} ></i>
                        </div>
                        <div className="mb-2">
                            <label className="switch-Login mb-2">
                                <span className='fs-6'>Remember Me</span>
                                <input type="checkbox" className="checkbox-Login" />
                                <div className="slider-Login"></div>
                            </label>
                            <Link to="/forgotpassword" className="text-danger fs-6">Forget Password?</Link>
                        </div>
                        <button type="submit" className="btn-Login">
                            <span>Sign In</span>
                        </button>
                    </form>
                </div>
                <div className="Login-toggle-container">
                    <div className="Login-toggle">
                        <div className="Login-toggle-panel Login-toggle-left">
                            <h1>Welcome Back!</h1>
                            <div className='title-toggle-Login'>
                                <p className='title-toggle-Login-title'>Enter personal details to use all site features</p>
                                <button className="btn-Submit-Login" onClick={toggleToLogin}>
                                    <i className="fa-solid fa-arrow-left me-2"></i>
                                    Sign In
                                </button>
                            </div>
                        </div>
                        <div className="Login-toggle-panel Login-toggle-right">
                            <h1 className=''>Hello!</h1>
                            <div className='title-toggle-Login'>
                                <p className='title-toggle-Login-title'>Register to use all site features</p>
                                <button className="btn-Submit-Login" onClick={toggleToRegister}>
                                    Sign Up
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
