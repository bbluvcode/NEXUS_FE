import React, { useState, useEffect, useRef } from "react";
import "../../components/css/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import StepButton from "./StepButton";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import showToast from "./ShowToast";

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const focusRef = useRef(null);
    const focusConfirmRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            if (step === 2) {
                setError("Code has expired. Please request a new code");
            }
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNextStep = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (step === 1) {
                if (!validateEmail(email)) {
                    setError("Invalid email format");
                    focusRef.current?.focus();
                    return;
                }
                const response = await axios.post("http://localhost:5185/api/Auth/send-code", { email });
                const expiryTime = response.data.data;
                showToast("A verification code has been sent to your email", "success", 3000);
                setTimeLeft(parseInt(expiryTime) * 60);
                setStep(2);
            }
            else if (step === 2) {
                if (timeLeft <= 0) {
                    setError("Code has expired. Please request a new code");
                    return;
                }
                const response = await axios.post("http://localhost:5185/api/Auth/check-code", { code });
                const { data } = response.data;
                localStorage.setItem("userIdForgot", data);
                showToast(
                    [
                        "VerifyCode successfully.",
                        "Redirecting to Set a new password.",
                    ],
                    'success', 3000
                );
                showToast("Set a new password", "success", 3000);
                setStep(3);
            }
            else if (step === 3) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
                if (!passwordRegex.test(newPassword)) {
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
                    focusRef.current?.focus();
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setError("Password and ConfirmPassword do not match");
                    focusConfirmRef.current?.focus();
                    return;
                }
                const userId = localStorage.getItem("userIdForgot");
                const response = await axios.post("http://localhost:5185/api/Auth/update-password", { userId, password: newPassword });
                setStep(4);
                showToast(
                    [
                        "Password updated successfully.",
                        "Redirecting to Login.",
                    ],
                    'success', 2000
                );
                setTimeout(() => {
                    localStorage.removeItem("userIdForgot");
                    navigate('/login');
                    window.location.href = '/login';
                }, 2000);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
                focusRef.current?.focus();
            } else {
                setError("Network error. Please try again");
            }
        }
    };

    const handleBackToLogin = () => {
        setError();
        navigate("/login");
        window.location.href = '/login';
    };

    const handleResendCode = async () => {
        try {
            const response = await axios.post("http://localhost:5185/api/Auth/send-code", { email }, { params: { isResend: true } });
            const expiryTime = response.data.data;
            setTimeLeft(parseInt(expiryTime) * 60);
            setError();
            showToast("A new code has been sent to your email", "success", 3000);
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessage = err.response.data.message.replace(/\./g, '.');
                showToast(errorMessage, "error", 3000);
            } else {
                setError("Network error. Please try again");
            }
        }
    };

    return (
        <div className="forgot-password-wrapper">
            <div className="forgot-password-container">
                <h2>Forgot Your Password</h2>
                <div className="stepper-ResetPassword">
                    {[1, 2, 3].map((item, index) => (
                        <React.Fragment key={index}>
                            <div className={`step-ResetPassword ${step > item ? "active" : ""} ${step === item ? "current" : ""}`}>
                                {step > item ? <i className="fa-solid fa-check"></i> : item}
                            </div>
                            {index < 2 && <div className={`connector-ResetPassword ${step > item ? "active" : ""}`}></div>}
                        </React.Fragment>
                    ))}
                </div>
                {step === 1 && (
                    <div className="step-content-ResetPassword">
                        <h3>Step 1: Enter Your Email</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            ref={focusRef}
                        />
                        {error && <p className="text-danger fs-5">{error}</p>}
                        <StepButton label="Next" onClick={handleNextStep} disabled={!email} />
                    </div>
                )}
                {step === 2 && (
                    <div className="step-content-ResetPassword">
                        <h3>Step 2: Enter Verification Code</h3>
                        <div className="input-container-ResetPass">
                            <input
                                type="text"
                                placeholder="Enter verification code"
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    setError("");
                                }}
                                className="w-50"
                                ref={focusRef}
                            />
                            <button className="button-refresh-ResetPassword" onClick={handleResendCode}>Resend</button>
                        </div>
                        {error && <p className="text-danger fs-5">{error}</p>}
                        <StepButton label="Verify" onClick={handleNextStep} disabled={!code} />
                        <div className="countdownTime-container">
                            <div className="countdownTime-circle">
                                <p>{`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`}</p>
                            </div>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="step-content-ResetPassword">
                        <h3>Step 3: Set a New Password</h3>
                        <div className="input-container-ResetPass">
                            <input
                                className="input-resetpassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setError("");
                                }}
                                ref={focusRef}
                            />
                            <i
                                className={`fa-solid ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            ></i>
                        </div>
                        <div className="input-container-ResetPass">
                            <input
                                className="input-resetpassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                                ref={focusConfirmRef}
                            />
                            <i
                                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            ></i>
                        </div>
                        {error && <p className="text-danger fs-6">{error}</p>}
                        <StepButton label="Apply" onClick={handleNextStep} disabled={!newPassword || !confirmPassword} />
                    </div>
                )}
                <div className="back-to-login">
                    <button className="btn-backToLogin" onClick={handleBackToLogin}>
                        <i className="fa-solid fa-arrow-left"></i>
                        <span className="ms-2">Back to Login</span>
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
