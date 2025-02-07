/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { addEmployeeRole } from '../../../../services/employeeService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const EmployeeTypeCreate = ({ setEmployeeTypes }) => {
  // Xác thực sử dụng Yup
  const validationSchema = Yup.object({
    roleName: Yup.string()
      .required('Role name is required') // Validation yêu cầu
      .min(3, 'Role name must be at least 3 characters') // Kiểm tra độ dài
      .max(50, 'Role name must be less than 50 characters') // Kiểm tra độ dài
  });

  // Xử lý form submit
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const newRole = { roleName: values.roleName };

    try {
      const result = await addEmployeeRole(newRole);
      setEmployeeTypes((prevEmployeeTypes) => [...prevEmployeeTypes, result]);
      resetForm(); // Reset form sau khi gửi

      // Hiển thị thông báo thành công với SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'New role added successfully!',
      });
    } catch (error) {
      console.error('Failed to add employee role:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add employee role. Please try again.',
      });
    }

    setSubmitting(false); // Dừng trạng thái đang gửi
  };

  return (
    <div>
      <h3>Create New Employee Role</h3>
      <Formik
        initialValues={{ roleName: '' }} // Giá trị mặc định
        validationSchema={validationSchema} // Sử dụng schema validate với Yup
        onSubmit={handleSubmit} // Hàm submit form
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="roleName">Role Name</label>
              <Field
                type="text"
                name="roleName"
                className="form-control"
              />
              <ErrorMessage name="roleName" component="div" className="text-danger" />
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary mt-3"
              disabled={isSubmitting} // Disable button khi đang submit
            >
              Add Role
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

EmployeeTypeCreate.propTypes = {
  setEmployeeTypes: PropTypes.func.isRequired,
};

export default EmployeeTypeCreate;
