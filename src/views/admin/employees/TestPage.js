import React, { useState, useEffect } from "react";
import Loading from "../../../components/Loading";

const TestPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Giả lập API gọi dữ liệu mất 3 giây
    setTimeout(() => {
      setUser({ name: "John Doe", email: "johndoe@example.com" });
    }, 300000);
  }, []);

  if (!user) {
    return <Loading message="Loading customer data..." />;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default TestPage;
