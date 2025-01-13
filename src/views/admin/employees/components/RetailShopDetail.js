/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRetailShopById } from '../../../../services/retailShopSerivce'
import {
    getAllEmployeeRoles,
    getAllEmployees,
    updateRole,
    toggleEmployeeStatus,
} from '../../../../services/employeeService'
import styles from '../../../../style/ManStyle.module.css' // Import CSS module

const RetailShopDetail = () => {
    const { id } = useParams()
    const [shop, setShop] = useState(null)
    const [employees, setEmployees] = useState([])
    const [employeeRoles, setEmployeeRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEditingRole, setIsEditingRole] = useState(null)
    const [newRole, setNewRole] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchBy, setSearchBy] = useState('fullName')
    const [sortConfig, setSortConfig] = useState({ key: 'status', direction: 'asc' }) // Default sort by status
    const navigate = useNavigate()

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const shopResponse = await getRetailShopById(id)
                setShop(shopResponse.data)

                const rolesResponse = await getAllEmployeeRoles()
                setEmployeeRoles(rolesResponse.data)

                const employeeResponse = await getAllEmployees()
                const shopEmployees = employeeResponse.data.filter(
                    (employee) => employee.retailShopId === Number(id),
                )

                const employeesWithRoles = shopEmployees.map((employee) => {
                    const role = rolesResponse.data.find((role) => {
                        return Number(role.roleId) === Number(employee.employeeRoleId)
                    })

                    return {
                        ...employee,
                        roleName: role ? role.roleName : 'Unknown Role',
                    }
                })

                setEmployees(employeesWithRoles)
                setLoading(false)
            } catch (error) {
                console.error(`Error loading retail shop with ID ${id}`, error)
                setLoading(false)
            }
        }

        fetchShop()
    }, [id])

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchByChange = (e) => {
        setSearchBy(e.target.value)
    }

    const filteredEmployees = employees.filter((employee) => {
        return employee[searchBy]?.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const handleSort = (e) => {
        const selectedKey = e.target.value
        const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
        setSortConfig({ key: selectedKey, direction })
    }

    const sortedEmployees = filteredEmployees.sort((a, b) => {
        if (sortConfig.key === 'status') {
            if (a.status === b.status) {
                return 0;
            }
            return a.status ? -1 : 1;  // Active first
        }
    
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
    

    const handleBack = () => {
        navigate(-1)
    }

    const handleActivateDeactivate = async (employeeId, currentStatus) => {
        try {
            await toggleEmployeeStatus(employeeId)
            const updatedEmployees = employees.map((employee) =>
                employee.employeeId === employeeId ? { ...employee, status: !currentStatus } : employee,
            )
            setEmployees(updatedEmployees)
        } catch (error) {
            console.error('Error toggling employee status:', error)
        }
    }

    const handleRoleChange = async (employeeId, newRoleId) => {
        if (newRoleId === '1') {
            alert('You cannot change the role to Admin.')
            return
        }

        try {
            const selectedRole = employeeRoles.find((role) => role.roleId === Number(newRoleId))
            if (!selectedRole) {
                alert('Invalid role selected.')
                return
            }

            await updateRole(employeeId, newRoleId)

            const updatedEmployees = employees.map((employee) =>
                employee.employeeId === employeeId
                    ? { ...employee, roleName: selectedRole.roleName }
                    : employee,
            )
            setEmployees(updatedEmployees)
            setIsEditingRole(null)
            setNewRole(null)
            alert('Role changed successfully!')
        } catch (error) {
            console.error('Error updating employee role:', error)
        }
    }

    const handleCancelRoleChange = () => {
        setIsEditingRole(null)
        setNewRole(null)
    }

    const handleChangeRoleClick = (employeeId, currentRoleId) => {
        if (currentRoleId !== '1') {
            setIsEditingRole(employeeId)
            setNewRole(currentRoleId)
        }
    }

    const handleViewEmployee = (employeeId) => {
        navigate(`/admin/EmployeeDetail/${employeeId}`)
    }

    if (!shop) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mt-3">
            <button onClick={handleBack} className="btn btn-outline-dark mb-4">
                Back
            </button>

            <div className="row">
                <div className="col-md-3">
                    <h2>Retail Shop Details</h2>
                    <span>
                        <strong>Name:</strong> {shop.retailShopName}
                    </span>
                    <br />
                    <span>
                        <strong>Address:</strong> {shop.address}
                    </span>
                    <br />
                    <span>
                        <strong>Email:</strong> {shop.email}
                    </span>
                    <br />
                    <span>
                        <strong>Phone:</strong> {shop.phone}
                    </span>
                    <br />
                </div>

                <div className="col-md-9">
                    <h2>Employees</h2>

                    <div className={styles['search-sort-container']}>
                        <div className={styles['search-container']}>
                            <select value={searchBy} onChange={handleSearchByChange} className="form-select me-2">
                                <option value="fullName">Name</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <select value={sortConfig.key} onChange={handleSort} className={`${styles['sort-select']} form-select`}>
                            <option value="fullName">Sort by Name</option>
                            <option value="status">Sort by Status</option>
                            <option value="email">Sort by Email</option>
                        </select>
                    </div>

                    {loading ? (
                        <div>Loading employees...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Gender</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedEmployees.length > 0 ? (
                                        sortedEmployees.map((employee, index) => (
                                            <tr
                                                key={index}
                                                className={employee.status ? styles.rowActive : styles.rowInactive}
                                            >
                                                <td>{employee.fullName}</td>
                                                <td>{employee.email || 'N/A'}</td>
                                                <td>{employee.phone || 'N/A'}</td>
                                                <td>{employee.gender}</td>
                                                <td>
                                                    {isEditingRole === employee.employeeId ? (
                                                        <select
                                                            value={newRole}
                                                            onChange={(e) => setNewRole(e.target.value)}
                                                            className="form-select"
                                                        >
                                                            {employeeRoles
                                                                .filter((role) => role.roleId !== 1)
                                                                .map((role) => (
                                                                    <option key={role.roleId} value={role.roleId}>
                                                                        {role.roleName}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    ) : (
                                                        employee.roleName
                                                    )}
                                                </td>
                                                <td>
                                                    <span
                                                        className={employee.status ? styles.activeStatus : styles.inactiveStatus}
                                                    >
                                                        {employee.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {isEditingRole === employee.employeeId ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleCancelRoleChange()}
                                                                className="btn btn-outline-danger btn-sm me-2 mb-2"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() => handleRoleChange(employee.employeeId, newRole)}
                                                                className="btn btn-outline-success btn-sm mb-2"
                                                            >
                                                                Confirm
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {employee.status ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleActivateDeactivate(employee.employeeId, employee.status)
                                                                    }
                                                                    className="btn btn-outline-warning btn-sm me-2 mb-2"
                                                                >
                                                                    Deactivate
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() =>
                                                                        handleActivateDeactivate(employee.employeeId, employee.status)
                                                                    }
                                                                    className="btn btn-outline-success btn-sm me-2 mb-2"
                                                                >
                                                                    Activate
                                                                </button>
                                                            )}
                                                            {employee.employeeRoleId !== 1 && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleChangeRoleClick(
                                                                            employee.employeeId,
                                                                            employee.employeeRoleId,
                                                                        )
                                                                    }
                                                                    className="btn btn-outline-info btn-sm me-2 mb-2"
                                                                >
                                                                    Change Role
                                                                </button>
                                                            )}
                                                            {/* Eye icon for view action */}
                                                            <button
                                                                onClick={() => handleViewEmployee(employee.employeeId)}
                                                                className="btn btn-outline-primary btn-sm mb-2"
                                                            >
                                                                <i className="fa fa-eye"></i> {/* Font Awesome Eye Icon */}
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No employees found for this shop</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RetailShopDetail
