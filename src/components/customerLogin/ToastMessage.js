import React from 'react';

const ToastMessage = ({ messages }) => {
    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
            ))}
        </div>
    );
};

export default ToastMessage;