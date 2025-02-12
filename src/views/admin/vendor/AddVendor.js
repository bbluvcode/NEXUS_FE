/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addVendor } from '../../../services/vendorService';
import { getAllRegions } from '../../../services/regionService';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';
const vendorValidationSchema = Yup.object().shape({
  vendorName: Yup.string()
  .max(15, 'Name must be at most 15 characters')
  .required('Name is required'),
  address: Yup.string()
  .max(50, 'Address must be at most 50 characters')
  .required('Address is required'),
  email: Yup.string()
  .email('Invalid email format')
  .required('Email is required'),
  phone: Yup.string()
  .length(10, 'Phone must be exactly 10 digits')
  .matches(/^\d+$/, 'Phone must contain only digits')
  .required('Phone is required'),
  fax: Yup.string()
  .max(15, 'Fax must be at most 15 characters')
  .required('Fax is required'),
  description: Yup.string()
  .max(1000, 'Description must be at most 1000 characters')
  .required('Description is required'),
  status: Yup.boolean().required('Status is required'),
  regionId: Yup.number()
  .nullable()
  .typeError('Region ID must be a number'),
});

const AddVendor = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  
  // Fetch danh sách regions từ backend
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getAllRegions();
        setRegions(response.data);
      } catch (error) {
        console.error('Failed to fetch regions', error);
      }
    };
    fetchRegions();
  }, []);

  // Xử lý submit form
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await addVendor(values);
      console.log('Vendor added successfully:', response);

      // SweetAlert success
      Swal.fire({
        title: 'Success!',
        text: 'Vendor added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      resetForm();
    } catch (error) {
      console.error('Error adding vendor:', error);

      // SweetAlert error
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add vendor. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  const handleBack = () => {
    navigate(-1)
}

  return (
    <div className="container">
      <button onClick={handleBack} className="btn btn-outline-dark mb-4">
        Back
      </button>
      <h2>Add Vendor</h2>
      <Formik
        initialValues={{
          vendorName: '',
          address: '',
          email: '',
          phone: '',
          fax: '',
          regionId: '',
          description: '',
          status: true,
        }}
        validationSchema={vendorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="vendorName">Name</label>
              <Field name="vendorName" className="form-control" />
              <ErrorMessage name="vendorName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <Field name="address" className="form-control" />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">Phone</label>
              <Field name="phone" className="form-control" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="fax">Fax</label>
              <Field name="fax" className="form-control" />
              <ErrorMessage name="fax" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="regionId">Region</label>
              <Field as="select" name="regionId" className="form-control">
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.regionId} value={region.regionId}>
                    {region.regionName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="regionId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <Field name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3 form-check">
              <Field
                type="checkbox"
                name="status"
                className="form-check-input"
                id="status"
              />
              <label htmlFor="status" className="form-check-label">
                Active
              </label>
              <ErrorMessage name="status" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary mb-3" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddVendor;
