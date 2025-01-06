/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllEmployeeRoles, getEmployeeById } from "../../../services/employeeService";
import styles from "../../../style/ManStyle.module.css";

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [roles, setRoles] = useState([]); // State lưu các role
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeAndRoles = async () => {
            try {
                // Lấy thông tin nhân viên
                const responseEmployee = await getEmployeeById(id);
                const responseRoles = await getAllEmployeeRoles(); // Lấy tất cả các role

                // Lưu các roles vào state
                setRoles(responseRoles.data);

                if (Array.isArray(responseEmployee.data)) {
                    const employeeData = responseEmployee.data.find(emp => emp.employeeId === parseInt(id));
                    if (employeeData) {
                        setEmployee(employeeData);
                    } else {
                        console.log("Employee not found in the response.");
                    }
                } else {
                    if (responseEmployee.data.employeeId === parseInt(id)) {
                        setEmployee(responseEmployee.data);
                    } else {
                        console.log("Employee not found in the response.");
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch employee details:", error);
                setLoading(false);
            }
        };

        fetchEmployeeAndRoles();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!employee) {
        return <div>Employee not found.</div>;
    }

    // Tìm role của nhân viên từ danh sách roles
    const employeeRole = roles.find(role => role.roleId === employee.employeeRoleId);
    const roleName = employeeRole ? employeeRole.roleName : "Unknown Role";

    // Lọc các trường có giá trị thực sự
    const renderField = (label, value) => {
        if (value) {
            return (
                <div className={styles.fieldDetail}>
                    <strong>{label}:</strong> {value}
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.containerDetail}>
            <div className={styles.cardDetail}>
                <h2 className={styles.cardTitleDetail}>{roleName} Detail</h2>
                {renderField("Full Name", employee.fullName)}
                {renderField("Employee Code", employee.employeeCode)}
                {renderField("Email", employee.email)}
                {renderField("Phone", employee.phone)}
                {renderField("Address", employee.address)}
                {renderField("Gender", employee.gender)}
                {renderField("Date of Birth", employee.dateOfBirth)}
                {renderField("Status", employee.status ? "Active" : "Inactive")}

                <button
                    className={styles.backButtonDetail}
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default EmployeeDetail;
