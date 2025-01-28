/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { getVendorById, updateVendor } from '../../../services/vendorService';
import { getAllRegions } from '../../../services/regionService';

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
    .typeError('Region ID must be a number')
    .required('Region is required'),
});

const UpdateVendor = () => {
  const { id } = useParams(); // Get vendor ID from the URL
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [regions, setRegions] = useState([]);

  // Fetch the vendor details when the component mounts
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await getVendorById(id);
        setVendor(response.data);
      } catch (error) {
        console.error('Failed to fetch vendor:', error);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await getAllRegions();
        setRegions(response.data);
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      }
    };

    fetchVendor();
    fetchRegions();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      // Add the vendor id to the values object before sending the request
      const updatedValues = { ...values, vendorId: id };
  
      console.log('Sending vendor update request with:', updatedValues); // Log request payload
      const response = await updateVendor(id, updatedValues); // Send updated values with vendor ID
      console.log('Vendor updated successfully:', response);
      alert('Vendor updated successfully!');
      navigate('/admin/VendorList');
    } catch (error) {
      console.error('Error updating vendor:', error);
      alert('Failed to update vendor. Please try again.');
    }
  };
  

  if (!vendor) {
    return <div>Loading...</div>; // Show loading state if vendor data is not yet fetched
  }

  return (
    <div className="container">
      <h2>Update Vendor</h2>
      <Formik
        initialValues={{
          vendorName: vendor.vendorName,
          address: vendor.address,
          email: vendor.email,
          phone: vendor.phone,
          fax: vendor.fax,
          regionId: vendor.regionId || '', // Ensure this is set correctly
          description: vendor.description,
          status: vendor.status || false, // Ensure default status is set as false if not provided
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

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateVendor;
