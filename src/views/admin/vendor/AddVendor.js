/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const vendorValidationSchema = Yup.object().shape({
  VendorName: Yup.string()
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  Address: Yup.string()
    .max(100, 'Address must be at most 100 characters')
    .required('Address is required'),
  Email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  Phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone is required'),
  Fax: Yup.string()
    .max(15, 'Fax must be at most 15 characters')
    .required('Fax is required'),
  RegionId: Yup.number()
    .required('Region ID is required')
    .typeError('Region ID must be a number'),
  Description: Yup.string()
    .max(255, 'Description must be at most 255 characters')
    .required('Description is required'),
});

const AddVendor = () => {
  const [regions, setRegions] = useState([]);

  // Lấy danh sách vùng từ backend
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('/api/regions');
        setRegions(response.data);
      } catch (error) {
        console.error('Failed to fetch regions', error);
      }
    };
    fetchRegions();
  }, []);

  const handleSubmit = (values) => {
    console.log('Submitted data:', values);
    // Gửi dữ liệu tới API backend
  };

  return (
    <div className="container">
      <h2>Add Vendor</h2>
      <Formik
        initialValues={{
          VendorName: '',
          Address: '',
          Email: '',
          Phone: '',
          Fax: '',
          RegionId: '',
          Description: '',
        }}
        validationSchema={vendorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="VendorName">Name</label>
              <Field name="VendorName" className="form-control" />
              <ErrorMessage name="VendorName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Address">Address</label>
              <Field name="Address" className="form-control" />
              <ErrorMessage name="Address" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Email">Email</label>
              <Field name="Email" className="form-control" type="email" />
              <ErrorMessage name="Email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Phone">Phone</label>
              <Field name="Phone" className="form-control" />
              <ErrorMessage name="Phone" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Fax">Fax</label>
              <Field name="Fax" className="form-control" />
              <ErrorMessage name="Fax" component="div" className="text-danger" />
            </div>

            {/* Dropdown Region */}
            <div className="mb-3">
              <label htmlFor="RegionId">Region</label>
              <Field as="select" name="RegionId" className="form-control">
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.RegionID} value={region.RegionID}>
                    {region.RegionName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="RegionId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Description">Description</label>
              <Field name="Description" className="form-control" />
              <ErrorMessage name="Description" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddVendor;
