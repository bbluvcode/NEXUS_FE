/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import RetainshopSection from "./components/RetainshopSection";
import styles from "../../../style/ManStyle.module.css";
import { getAllRetainShops } from "../../../services/retainShopSerivce";
import { getAllEmployeeRoles, getAllEmployees, updateEmployeeRole, toggleEmployeeStatus } from "../../../services/employeeService";

const EmployeesList = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [retainShopData, setRetainShopData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [originalEmployeeData, setOriginalEmployeeData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleChanges, setRoleChanges] = useState({}); // Store temporary role changes

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [retainShopsResponse, employeesResponse, rolesResponse] = await Promise.all([
          getAllRetainShops(),
          getAllEmployees(),
          getAllEmployeeRoles(),
        ]);

        const employees = employeesResponse.data || [];
        setRetainShopData(retainShopsResponse.data || []);
        setEmployeeData(employees); // Lưu dữ liệu employees vào state
        setOriginalEmployeeData(JSON.parse(JSON.stringify(employees))); // Tạo bản sao gốc của dữ liệu employees
        setRoles(rolesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleStatus = async (retainshopName, employee) => {
    try {
      const updatedEmployee = await toggleEmployeeStatus(employee.employeeId);

      setEmployeeData((prevData) =>
        prevData.map((emp) =>
          emp.employeeId === updatedEmployee.employeeId
            ? { ...emp, status: updatedEmployee.status }
            : emp
        )
      );
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const handleRoleUpdate = (employeeId, newRoleId) => {
    const employee = employeeData.find((emp) => emp.employeeId === employeeId);

    // Prevent updates to or from admin role (roleId === 1)
    if (employee.employeeRoleId === 1 || newRoleId === 1) {
      alert("Cannot assign or remove the admin role.");
      return;
    }

    // Save the role change temporarily
    setRoleChanges((prev) => ({
      ...prev,
      [employeeId]: newRoleId,
    }));
  };


  const handleSaveChanges = async () => {
    const restrictedChanges = Object.entries(roleChanges).filter(
      ([employeeId, newRoleId]) => {
        const employee = employeeData.find((emp) => emp.employeeId === parseInt(employeeId, 10));
        return employee.employeeRoleId === 1 || newRoleId === 1; // Prevent admin role changes
      }
    );

    if (restrictedChanges.length > 0) {
      alert("Cannot update roles involving the admin role.");
      return;
    }

    // Apply all valid role changes to the server
    const updatePromises = Object.entries(roleChanges).map(([employeeId, newRoleId]) =>
      updateEmployeeRole(parseInt(employeeId, 10), newRoleId)
    );

    try {
      await Promise.all(updatePromises);

      // Update the state with new roles
      setEmployeeData((prevData) =>
        prevData.map((employee) => ({
          ...employee,
          employeeRoleId: roleChanges[employee.employeeId] || employee.employeeRoleId,
        }))
      );

      // Clear temporary changes
      setRoleChanges({});
    } catch (error) {
      console.error("Failed to save role changes:", error);
    }
  };


  const handleResetChanges = () => {
    setEmployeeData(JSON.parse(JSON.stringify(originalEmployeeData))); // Khôi phục trạng thái từ bản sao gốc
    setRoleChanges({}); // Xóa các thay đổi tạm thời
  };


  const groupedData = retainShopData.map((shop) => ({
    ...shop,
    employees: employeeData
      .filter((employee) => employee.retainShopId === shop.retainShopId)
      .map((employee) => {
        const originalEmployee = originalEmployeeData.find(
          (original) => original.employeeId === employee.employeeId
        );

        return {
          ...employee,
          employeeRoleId: roleChanges[employee.employeeId] || employee.employeeRoleId,
          originalEmployeeRoleId: originalEmployee?.employeeRoleId,
          role: Array.isArray(roles)
            ? roles.find(
              (role) =>
                role.roleId ===
                (roleChanges[employee.employeeId] || employee.employeeRoleId)
            )?.roleName || "No Role Assigned"
            : "No Role Assigned",
        };
      })
      .filter((employee) =>
        employee.fullName.toLowerCase().includes(searchTerm) // Lọc theo tên
      )
      .sort((a, b) => {
        if (sortOption === "name") {
          return a.fullName.localeCompare(b.fullName);
        }
        return 0;
      }),
  }));



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <SearchBar
        isSearchVisible={isSearchVisible}
        handleSearchClick={() => setIsSearchVisible((prev) => !prev)}
        handleSearchChange={handleSearchChange}
        handleSaveChanges={handleSaveChanges}
        handleResetChanges={handleResetChanges}
      />
      <SortDropdown handleSortChange={handleSortChange} />
      {groupedData.length > 0 ? (
        groupedData.map((shop) => (
          <RetainshopSection
            key={shop.retainShopId}
            retainshopName={shop.retainShopName}
            employees={shop.employees}
            roles={roles}
            sortOption={sortOption}
            toggleStatus={toggleStatus}
            onUpdateRole={handleRoleUpdate}
            originalEmployeeData={originalEmployeeData} // Truyền dữ liệu gốc xuống
          />
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default EmployeesList;
